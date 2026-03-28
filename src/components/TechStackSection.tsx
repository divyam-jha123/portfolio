import { motion } from 'framer-motion';
import { techStack } from '../data';

export function TechStackSection() {
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
      <div className="tech-stack-grid">
        {techStack.categories.map((category) => (
          <div className="tech-category" key={category.name}>
            <h4>{category.name}</h4>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
