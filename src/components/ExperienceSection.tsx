import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { SiLinuxfoundation } from 'react-icons/si';
import { experiences } from '../data';
import type { ExperienceLink } from '../data';

const linkIcon: Record<ExperienceLink['kind'], ComponentType<{ size?: number }>> = {
  lfx: SiLinuxfoundation,
  proposal: FileText,
};

export function ExperienceSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Experience</h2>
      {experiences.map((exp) => (
        <div className="experience-entry" key={exp.role}>
          <div className="entry-header">
            <div className="entry-title-group">
              <h3 className="entry-title">{exp.role}</h3>
              {exp.links && exp.links.length > 0 && (
                <div className="entry-links">
                  {exp.links.map((link) => {
                    const Icon = linkIcon[link.kind];
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-icon-link"
                        title={link.label}
                        aria-label={`${exp.role} — ${link.label}`}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <span className="entry-date">{exp.year}</span>
          </div>
          <p className="entry-org">{exp.organization}</p>
          <ul className="experience-points">
            {exp.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </motion.section>
  );
}
