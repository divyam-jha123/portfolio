import { useState } from 'react';
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
  'TypeScript':     <SiTypescript />,
  'javascript':     <SiJavascript />,
  'Python':         <SiPython />,
  'java':           <FaJava />,
  'React':          <SiReact />,
  'Next.js':        <SiNextdotjs />,
  'bootstrap':      <SiBootstrap />,
  'Tailwind CSS':   <SiTailwindcss />,
  'Node.js':        <SiNodedotjs />,
  'FastAPI':        <SiFastapi />,
  'Express':        <SiExpress />,
  'SupaBase':       <SiSupabase />,
  'FireBase':       <SiFirebase />,
  'Docker':         <SiDocker />,
  'AWS':            <FaAws />,
  'MongoDB':        <SiMongodb />,
  'PostgreSQL':     <SiPostgresql />,
  'Redis':          <SiRedis />,
};

// Flatten all tech items for the marquee
const allItems = techStack.categories.flatMap(c => c.items);

export function TechStackSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Tech Stack</div>
      <p className="tech-stack-description">{techStack.description}</p>

      {/* Marquee carousel */}
      {!isExpanded ? 
      <div className="marquee-wrapper">
        <div className="marquee-fade marquee-fade-left" />
        <div className="marquee-fade marquee-fade-right" />
        <div className="marquee-track">
          {[...allItems, ...allItems].map((item, i) => (
            <div className="marquee-item" key={`${item}-${i}`}>
              <span className="marquee-icon">{iconMap[item]}</span>
              <span className="marquee-label">{item}</span>
            </div>
          ))}
        </div>
      </div>
      : null}

      <div className={`tech-expand-grid ${isExpanded ? 'active' : ''}`}>
        {techStack.categories.map((category) => (
          <div className="tech-category" key={category.name}>
            <h4>{category.name}</h4>
            <ul>
              {category.items.map((item) => (
                <li key={item}>
                  <span className="tech-list-icon">{iconMap[item]}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Expandable full grid */}
      <button
        className="view-more-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ marginTop: '24px' }}
      >
        {isExpanded ? 'Collapse ↑' : 'View Full Stack ↓'}
      </button>
    </motion.section>
  );
}
