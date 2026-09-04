import { useEffect, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';

const NAVIGATE_EVENT = 'app:navigate';

/** Trailing slashes and casing shouldn't produce a different page. */
export function normalize(path: string): string {
  const trimmed = path.replace(/\/+$/, '').toLowerCase();
  return trimmed === '' ? '/' : trimmed;
}

export function usePathname(): string {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', sync);
    window.addEventListener(NAVIGATE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(NAVIGATE_EVENT, sync);
    };
  }, []);

  return path;
}

export function navigate(to: string) {
  if (normalize(to) === normalize(window.location.pathname)) return;
  window.history.pushState({}, '', to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

type LinkProps = {
  to: string;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
};

/** A real anchor — middle-click, cmd-click, and "copy link" all keep working. */
export function Link({ to, children, className, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
