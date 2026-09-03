import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { techStack } from '../data';
import {
  SiTypescript, SiJavascript, SiPython, SiReact, SiNextdotjs,
  SiBootstrap, SiTailwindcss, SiNodedotjs, SiFastapi, SiExpress,
  SiSupabase, SiFirebase, SiDocker, SiMongodb,
  SiPostgresql, SiRedis
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  'typescript':     <SiTypescript />,
  'javascript':     <SiJavascript />,
  'python':         <SiPython />,
  'java':           <FaJava />,
  'react':          <SiReact />,
  'next.js':        <SiNextdotjs />,
  'bootstrap':      <SiBootstrap />,
  'tailwind css':   <SiTailwindcss />,
  'node.js':        <SiNodedotjs />,
  'fastapi':        <SiFastapi />,
  'express':        <SiExpress />,
  'supabase':       <SiSupabase />,
  'firebase':       <SiFirebase />,
  'docker':         <SiDocker />,
  'aws':            <FaAws />,
  'mongodb':        <SiMongodb />,
  'postgresql':     <SiPostgresql />,
  'redis':          <SiRedis />,
};

// Data labels are display-cased; look up case-insensitively so a casing drift
// in data.ts never silently renders an empty icon slot.
const iconFor = (item: string) => iconMap[item.toLowerCase()] ?? null;

// Flatten all tech items for the marquee
const allItems = techStack.categories.flatMap(c => c.items);

export function TechStackSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Tech Stack</h2>
      <p className="tech-stack-description">{techStack.description}</p>

      {/* Marquee carousel */}
      {!isExpanded ? (
        <div className="marquee-wrapper">
          <div className="marquee-fade marquee-fade-left" />
          <div className="marquee-fade marquee-fade-right" />
          {/* Decorative: the same list is available, static and readable,
              behind the View Full Stack control below. */}
          <div
            className={`marquee-track ${isPaused ? 'paused' : ''}`}
            aria-hidden="true"
          >
            {[...allItems, ...allItems].map((item, i) => (
              <div className="marquee-item" key={`${item}-${i}`}>
                <span className="marquee-icon">{iconFor(item)}</span>
                <span className="marquee-label">{item}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="marquee-pause"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            {isPaused ? 'Play' : 'Pause'}
          </button>
        </div>
      ) : null}

      <div className={`tech-expand-grid ${isExpanded ? 'active' : ''}`}>
        {techStack.categories.map((category) => (
          <div className="tech-category" key={category.name}>
            <h3>{category.name}</h3>
            <ul>
              {category.items.map((item) => (
                <li key={item}>
                  <span className="tech-list-icon">{iconFor(item)}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Expandable full grid */}
      <button
        type="button"
        className="view-more-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        style={{ marginTop: '24px' }}
      >
        {isExpanded ? 'Collapse ↑' : 'View Full Stack ↓'}
      </button>
    </motion.section>
  );
}
