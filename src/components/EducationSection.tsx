import { motion } from 'framer-motion';
import { education } from '../data';

export function EducationSection() {

  return (
    <motion.section
      id="education"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
        <h2 className="section-label">Education</h2>
        <div className="education-entry">
          <div className="entry-header">
            <h3 className="entry-title">{education.institution}</h3>
            <span className="entry-date">{education.year}</span>
          </div>
          <p className="entry-org">{education.degree}</p>
        </div>
    </motion.section>
  );
}
