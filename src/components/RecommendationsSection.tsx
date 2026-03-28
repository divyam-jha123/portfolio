import { motion } from 'framer-motion';
import { recommendations } from '../data';

export function RecommendationsSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Recommendations by Clients</div>
      {recommendations.map((rec, index) => (
        <div className="recommendation-entry" key={index}>
          <div className="recommendation-author">
            <a href={rec.linkedinUrl} target="_blank" rel="noopener noreferrer">
              {rec.name}
            </a>
          </div>
          <p className="recommendation-text">{rec.text}</p>
        </div>
      ))}
    </motion.section>
  );
}
