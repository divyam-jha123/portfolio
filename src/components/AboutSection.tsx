import { motion } from 'framer-motion';
import { aboutMe } from '../data';

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Thing about me</h2>
      <div className="about-content">
        {aboutMe.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </motion.section>
  );
}
