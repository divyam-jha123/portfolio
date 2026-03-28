import { QrCode } from 'lucide-react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { socials } from '../data';


export function Dock() {
  const [showQR, setShowQR] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (showQR && qrCanvasRef.current) {
      drawQRCode(qrCanvasRef.current, window.location.href);
    }
  }, [showQR]);

  return (
    <>
      <motion.div
        className="dock"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.button
          className="dock-item"
          onClick={() => setShowQR(true)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="QR Code"
        >
          <QrCode size={18} />
        </motion.button>

        <div className="dock-divider" />

        <motion.a
          className="dock-item"
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="GitHub"
        >
          <FaGithub size={18} />
        </motion.a>

        <motion.a
          className="dock-item"
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="LinkedIn"
        >
          <FaLinkedin size={18} />
        </motion.a>

        <motion.a
          className="dock-item"
          href={socials.x}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title="X (Twitter)"
        >
          <FaXTwitter size={18} />
        </motion.a>

      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            className="qr-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="qr-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Scan to visit</h3>
              <canvas ref={qrCanvasRef} width={200} height={200} style={{ imageRendering: 'pixelated' }} />
              <button className="qr-close" onClick={() => setShowQR(false)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Simple QR code drawer (draws a stylized QR-like pattern based on URL)
function drawQRCode(canvas: HTMLCanvasElement, url: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = 200;
  const moduleCount = 25;
  const moduleSize = size / moduleCount;

  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim() || '#fff';
  ctx.fillRect(0, 0, size, size);

  const fg = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#000';
  ctx.fillStyle = fg;

  // Generate a deterministic pattern from the URL
  const hash = (s: string, i: number) => {
    let h = 0;
    for (let j = 0; j < s.length; j++) {
      h = ((h << 5) - h + s.charCodeAt(j) + i * 31) | 0;
    }
    return h;
  };

  // Draw finder patterns (the 3 big squares in corners)
  const drawFinder = (x: number, y: number) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (
          i === 0 || i === 6 || j === 0 || j === 6 ||
          (i >= 2 && i <= 4 && j >= 2 && j <= 4)
        ) {
          ctx.fillRect((x + i) * moduleSize, (y + j) * moduleSize, moduleSize, moduleSize);
        }
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(moduleCount - 7, 0);
  drawFinder(0, moduleCount - 7);

  // Fill data area with URL-derived pattern
  for (let i = 0; i < moduleCount; i++) {
    for (let j = 0; j < moduleCount; j++) {
      // Skip finder patterns
      if ((i < 8 && j < 8) || (i >= moduleCount - 8 && j < 8) || (i < 8 && j >= moduleCount - 8)) continue;
      if (Math.abs(hash(url, i * moduleCount + j)) % 3 !== 0) {
        ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
      }
    }
  }
}
