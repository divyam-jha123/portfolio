import { motion } from 'framer-motion';
import { experiences } from '../data';

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
      {experiences.map((exp) => (
        <div className="experience-entry" key={exp.role}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span className="education-institution">{exp.role}</span>
            <span className="education-year">{exp.year}</span>
          </div>
          <span className="education-year">{exp.organization}</span>
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
