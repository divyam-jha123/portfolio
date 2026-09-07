import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { now } from '../data';

export function NowSection() {
  const { board } = now;

  return (
    <motion.section
      id="now"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Now</h2>
      <p className="now-intro">{now.intro}</p>

      <div className="now-card">
        <p className="now-card-label">
          {/* Reuses the Products status dot so "live" reads the same way twice. */}
          <span className="product-status-dot" aria-hidden="true" />
          {board.label}
        </p>
        <p className="now-card-text">{board.description}</p>
        {/* Without a link the board is not public yet, so the action would be a
            dead end — the copy still stands on its own. */}
        {board.url && (
          <a
            className="btn btn--primary now-card-action"
            href={board.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {board.action}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.section>
  );
}
