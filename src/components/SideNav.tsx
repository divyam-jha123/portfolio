import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'tech', label: 'Tech Stack' },
  { id: 'writing', label: 'Writings' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function SideNav() {
  const [active, setActive] = useState(sections[0].id);
  const [expanded, setExpanded] = useState(false);

  // The section whose top sits closest above the viewport's midline is the one
  // being read; an IntersectionObserver ratio would flip on tall sections.
  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <nav
      className={`side-nav${expanded ? ' side-nav--expanded' : ''}`}
      aria-label="Sections"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false);
      }}
    >
      <ul className="side-nav-list">
        {sections.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                className={`side-nav-item${isActive ? ' is-active' : ''}`}
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="side-nav-label-slot">
                  <AnimatePresence initial={false}>
                    {(expanded || isActive) && (
                      <motion.span
                        className="side-nav-label"
                        aria-hidden="true"
                        initial={{ opacity: 0, x: 4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="side-nav-dot" aria-hidden="true" />
                <span className="side-nav-sr">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
