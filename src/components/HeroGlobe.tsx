import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import { personalInfo } from '../data';

// Degrees per second of idle drift once the small globe has settled.
const IDLE_SPIN = 4;
// How far the popout magnifies the region around the marker.
const POPOUT_ZOOM = 2.6;

type RenderOptions = {
  size: number;
  /** Start a quarter turn away and swing round to the marker. */
  intro: boolean;
  /** Sway gently about the marker once settled. */
  drift: boolean;
  /** Projection scale multiplier; >1 magnifies the region around the marker. */
  zoom: number;
  reduceMotion: boolean;
};

/**
 * Draws the globe onto a canvas and keeps it animating until unmount. Country
 * data is fetched lazily; colors come from the CSS tokens on the canvas.
 */
function useGlobeRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { size, intro, drift, zoom, reduceMotion }: RenderOptions
) {
  const { lat, lng } = personalInfo.location;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let cancelled = false;

    import('world-atlas/countries-110m.json').then((mod) => {
      if (cancelled) return;
      const topo = mod.default as unknown as Topology<{ countries: GeometryCollection }>;
      const land = feature(topo, topo.objects.countries) as GeoPermissibleObjects;
      const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b);
      const graticule = geoGraticule10();

      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const radius = size / 2 - 1;
      const projection = geoOrthographic()
        .translate([size / 2, size / 2])
        .clipAngle(90);

      const styles = getComputedStyle(canvas);
      const colors = {
        ocean: styles.getPropertyValue('--globe-ocean').trim(),
        land: styles.getPropertyValue('--globe-land').trim(),
        line: styles.getPropertyValue('--globe-line').trim(),
        rim: styles.getPropertyValue('--globe-rim').trim(),
        marker: styles.getPropertyValue('--accent').trim(),
      };

      // The base globe (sphere, graticule, land, borders, rim) is expensive to
      // stroke, so it is drawn into an offscreen canvas and only re-rendered
      // when the rotation actually changes. A still globe then costs one blit
      // per frame instead of a full re-stroke, which keeps the popout's
      // spring animation smooth.
      const base = document.createElement('canvas');
      base.width = canvas.width;
      base.height = canvas.height;
      const baseCtx = base.getContext('2d');
      if (!baseCtx) return;
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const basePath = geoPath(projection, baseCtx);
      let baseKey = '';

      const renderBase = () => {
        baseCtx.clearRect(0, 0, size, size);
        baseCtx.save();
        // A magnified projection spills past the disc; keep it inside.
        baseCtx.beginPath();
        baseCtx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        baseCtx.clip();

        baseCtx.beginPath();
        basePath({ type: 'Sphere' });
        baseCtx.fillStyle = colors.ocean;
        baseCtx.fill();

        baseCtx.beginPath();
        basePath(graticule);
        baseCtx.lineWidth = 0.3;
        baseCtx.strokeStyle = colors.line;
        baseCtx.globalAlpha = 0.18;
        baseCtx.stroke();
        baseCtx.globalAlpha = 1;

        baseCtx.beginPath();
        basePath(land);
        baseCtx.fillStyle = colors.land;
        baseCtx.fill();

        baseCtx.beginPath();
        basePath(borders);
        baseCtx.lineWidth = size > 120 ? 1 : 0.75;
        baseCtx.strokeStyle = colors.line;
        baseCtx.stroke();
        baseCtx.restore();

        baseCtx.beginPath();
        baseCtx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
        baseCtx.lineWidth = 1;
        baseCtx.strokeStyle = colors.rim;
        baseCtx.stroke();
      };

      const target = { lambda: -lng, phi: -lat };
      const animateIn = intro && !reduceMotion;
      let lambda = animateIn ? target.lambda - 90 : target.lambda;
      let phi = animateIn ? target.phi - 20 : target.phi;
      let last = performance.now();
      let arrived = !animateIn;
      let driftT = 0;

      const draw = (now: number) => {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        if (!arrived) {
          lambda += (target.lambda - lambda) * Math.min(1, dt * 3);
          phi += (target.phi - phi) * Math.min(1, dt * 3);
          if (Math.abs(target.lambda - lambda) < 0.2 && Math.abs(target.phi - phi) < 0.2) {
            lambda = target.lambda;
            phi = target.phi;
            arrived = true;
          }
        } else if (drift && !reduceMotion) {
          driftT += dt * IDLE_SPIN;
          lambda = target.lambda + Math.sin(driftT / 8) * 15;
        }

        projection.rotate([lambda, phi]).scale(radius * zoom);
        const key = `${lambda.toFixed(2)}|${phi.toFixed(2)}`;
        if (key !== baseKey) {
          baseKey = key;
          renderBase();
        }

        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(base, 0, 0, size, size);

        // The marker only shows on the near side of the globe.
        const [mx, my] = projection([lng, lat]) ?? [NaN, NaN];
        const [cx, cy] = projection.invert?.([size / 2, size / 2]) ?? [0, 0];
        const visible = greatCircle(cx, cy, lng, lat) < 90;
        if (visible && Number.isFinite(mx)) {
          const r = Math.max(2, Math.min(size / 22, 6));
          if (!reduceMotion) {
            const t = (now / 1800) % 1;
            ctx.beginPath();
            ctx.arc(mx, my, r + r * 2.2 * t, 0, Math.PI * 2);
            ctx.strokeStyle = colors.marker;
            ctx.globalAlpha = 0.7 * (1 - t);
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
          ctx.beginPath();
          ctx.arc(mx, my, r, 0, Math.PI * 2);
          ctx.fillStyle = colors.marker;
          ctx.fill();
          ctx.lineWidth = 1;
          ctx.strokeStyle = colors.ocean;
          ctx.stroke();
        }

        if (!reduceMotion || !arrived) frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [canvasRef, size, intro, drift, zoom, reduceMotion, lat, lng]);
}

/**
 * The small globe in the hero meta line. Clicking it pops a large, zoomed-in
 * copy out from the same spot so the exact location is readable.
 */
export function HeroGlobe({ size: desktopSize = 56 }: { size?: number }) {
  const size = useMobile() ? Math.round(desktopSize * 0.8) : desktopSize;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  // The popout springs out from wherever the button is at click time.
  const [origin, setOrigin] = useState<DOMRect | null>(null);
  const { city } = personalInfo.location;

  useGlobeRenderer(canvasRef, { size, intro: true, drift: true, zoom: 1, reduceMotion });

  // The lock is tied to the open state rather than the popout's lifetime, so an
  // interrupted exit animation can never leave the page unscrollable.
  useEffect(() => {
    if (!origin) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [origin]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="hero-globe"
        style={{ width: size, height: size }}
        title={`Based in ${city}`}
        aria-label={`Based in ${city}. Show on a larger globe`}
        aria-haspopup="dialog"
        aria-expanded={origin !== null}
        onClick={() => setOrigin(buttonRef.current?.getBoundingClientRect() ?? null)}
      >
        <canvas ref={canvasRef} aria-hidden="true" style={{ width: size, height: size }} />
      </button>

      <AnimatePresence>
        {origin && (
          <GlobePopout
            origin={origin}
            reduceMotion={reduceMotion}
            onClose={() => {
              setOrigin(null);
              buttonRef.current?.focus();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

type PopoutProps = {
  origin: DOMRect;
  reduceMotion: boolean;
  onClose: () => void;
};

function GlobePopout({ origin, reduceMotion, onClose }: PopoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [size] = useState(() => Math.min(360, window.innerWidth - 64));
  const { city, lat, lng } = personalInfo.location;

  useGlobeRenderer(canvasRef, { size, intro: false, drift: false, zoom: POPOUT_ZOOM, reduceMotion });

  // Escape closes and Tab stays inside. The scroll lock lives in HeroGlobe.
  useLayoutEffect(() => {
    dialogRef.current?.querySelector<HTMLElement>('.globe-close')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button, [href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  // Where the big globe starts: over the small one, at its scale.
  const from = {
    x: origin.left + origin.width / 2 - window.innerWidth / 2,
    y: origin.top + origin.height / 2 - window.innerHeight / 2,
    scale: origin.width / size,
  };

  // Portalled to the body: a modal should not inherit the hero meta line's
  // monospace type or sit inside its flex row.
  return createPortal(
    <motion.div
      className="globe-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="globe-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="globe-dialog-title"
        initial={reduceMotion ? { opacity: 0 } : { ...from, opacity: 0.4 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { ...from, opacity: 0 }}
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 }
        }
        onClick={(e) => e.stopPropagation()}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="globe-dialog-canvas"
          style={{ width: size, height: size }}
        />
        <h2 id="globe-dialog-title" className="globe-dialog-title">{city}</h2>
        <p className="globe-dialog-coords">
          {formatCoord(lat, 'N', 'S')} · {formatCoord(lng, 'E', 'W')} · IST
        </p>
        <button type="button" className="globe-close" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function formatCoord(value: number, pos: string, neg: string): string {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? pos : neg}`;
}

// Tracks the stylesheet's single breakpoint so the globe scales with the meta line.
function useMobile(): boolean {
  const query = '(max-width: 640px)';
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return mobile;
}

function greatCircle(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const toRad = Math.PI / 180;
  const a =
    Math.sin(lat1 * toRad) * Math.sin(lat2 * toRad) +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos((lng2 - lng1) * toRad);
  return Math.acos(Math.max(-1, Math.min(1, a))) / toRad;
}
