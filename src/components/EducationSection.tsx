import { motion } from 'framer-motion';
import { education } from '../data';

export function EducationSection() {

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
        <div className="section-label">Education</div>
        <div className="education-entry">
          <div className='education-institution'>{education.institution}</div>
          <span className="education-year">{education.year}</span>
        </div>
    </motion.section>
  );
}
