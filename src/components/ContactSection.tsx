import { motion } from 'framer-motion';
import { socials } from '../data';

export function ContactSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Get in Touch</div>
      <p className="contact-content">
        connect with me on{' '}
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          linkedin
        </a>{' '}
        or shoot an{' '}
        <a href={`mailto:${socials.email}`}>
          email
        </a>
      </p>
    </motion.section>
  );
}
