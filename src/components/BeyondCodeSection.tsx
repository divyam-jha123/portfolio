import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Rocket } from 'lucide-react';
import { GiShuttlecock } from 'react-icons/gi';
import { beyondCode } from '../data';

/** Data carries an icon key, not a component, so `src/data.ts` stays pure copy. */
const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  gym: Dumbbell,
  badminton: GiShuttlecock,
  startups: Rocket,
};

export function BeyondCodeSection() {
  return (
    <motion.section
      id="beyond"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Beyond the Code</h2>
      <p className="beyond-intro">{beyondCode.intro}</p>
      <ul className="beyond-grid">
        {beyondCode.interests.map(({ icon, title, text }) => {
          const Icon = ICONS[icon];
          return (
            <li key={title} className="beyond-card">
              <span className="beyond-icon" aria-hidden="true">
                {Icon ? <Icon size={18} /> : null}
              </span>
              <h3 className="beyond-title">{title}</h3>
              <p className="beyond-text">{text}</p>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
