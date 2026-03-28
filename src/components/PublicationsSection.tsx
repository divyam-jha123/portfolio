import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { publications } from '../data';

export function PublicationsSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Research Publications</div>
      {publications.map((pub, index) => (
        <div className="publication-entry" key={index}>
          <div className="publication-conference">{pub.conference}</div>
          <div className="publication-title">{pub.title}</div>
          <div className="publication-authors">Authors: {pub.authors}</div>
          <a
            className="publication-link"
            href={pub.doi}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Publication <ExternalLink size={12} />
          </a>
          <details className="publication-abstract">
            <summary>Abstract</summary>
            <p>{pub.abstract}</p>
          </details>
        </div>
      ))}
    </motion.section>
  );
}
