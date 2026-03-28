import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { experiences, type ExperienceEntry } from '../data';

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="experience-entry">
      <div className="experience-header">
        <div className="experience-company">
          {entry.companyUrl ? (
            <a href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
              {entry.company}
              <ExternalLink size={14} className="external-link-icon" />
            </a>
          ) : (
            entry.company
          )}
          {entry.badge && <span className="experience-badge">{entry.badge}</span>}
        </div>
        <span className="experience-meta" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
          {entry.period}
        </span>
      </div>
      <div className="experience-meta">
        {entry.role} · {entry.location}
      </div>
      <p className="experience-summary">{entry.summary}</p>

      {entry.details.length > 0 && (
        <>
          <button className="view-more-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'View Less' : 'View More'}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                className="experience-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ul>
                  {entry.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Experience</div>
      {experiences.map((entry, index) => (
        <ExperienceCard key={index} entry={entry} />
      ))}
    </motion.section>
  );
}
