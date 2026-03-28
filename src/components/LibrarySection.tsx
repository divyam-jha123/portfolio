import { motion } from 'framer-motion';
import { library } from '../data';

export function LibrarySection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Library</div>
      <h3 className="section-subtitle">Casual Reads</h3>
      <div className="library-grid">
        {library.books.map((book, index) => (
          <motion.div
            className="book-card"
            key={index}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
          </motion.div>
        ))}
      </div>
      <p className="library-note">{library.description}</p>
    </motion.section>
  );
}
