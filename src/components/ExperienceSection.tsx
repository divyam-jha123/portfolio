import { motion } from 'framer-motion';
import { experiences } from '../data';

export function ExperienceSection() {
  return (
    <motion.section
      id="experience"
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
            <h3 className="entry-title">{exp.role}</h3>
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
