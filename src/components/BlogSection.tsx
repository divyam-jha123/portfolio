import { motion } from 'framer-motion';
import { writings } from '../data';

export function BlogSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Writings & Blogs</div>
      <p className="blog-description">
        i host my thoughts on{' '}
        <a
          href={writings.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          {writings.platform.toLowerCase()}
        </a>{' '}
        rather than building a custom site. instead of overengineering and reinventing
        the wheel, i prefer leveraging a mature platform that lets me focus on what
        matters: sharing insights on ai systems, product strategy, and technical
        architecture.
      </p>
    </motion.section>
  );
}
