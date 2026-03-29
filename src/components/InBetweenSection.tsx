import { useState } from 'react';
import { motion } from 'framer-motion';
import { inBetweenExperiences } from '../data';

export function InBetweenSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parse markdown-style bold (**text**) into JSX
  const parseContent = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  const paragraphs = inBetweenExperiences.content.split('\n\n');

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="section-label">{inBetweenExperiences.title}</div>
        <div className='section-box'>
          <h3 className="section-subtitle">{inBetweenExperiences.subtitle}</h3>
          
          <div className={`content ${isExpanded ? 'active' : ''}`}>
            <div className="in-between-content">
              {paragraphs.map((p, i) => (
                <p key={i}>{parseContent(p)}</p>
              ))}
            </div>
          </div>
          
          <button 
            className="view-more-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ marginTop: '12px' }}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
