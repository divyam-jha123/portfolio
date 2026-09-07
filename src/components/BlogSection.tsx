import { motion } from 'framer-motion';
import { writings } from '../data';

export function BlogSection() {
  return (
    <motion.section
      id="writing"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Writings & Blogs</h2>
      {writings.paragraphs.map((paragraph) => (
        <p className="blog-description" key={paragraph.link.label}>
          {paragraph.lead}
          <a
            href={paragraph.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            {paragraph.link.label}
          </a>
          {paragraph.suffix}
        </p>
      ))}
    </motion.section>
  );
}
