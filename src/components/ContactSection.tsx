import { motion } from 'framer-motion';
import { socials } from '../data';

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="section-label">Get in Touch</h2>
      <p className="contact-content">
        Connect with me on{' '}
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{' '}
        or shoot me an{' '}
        <a href={`mailto:${socials.email}`}>
          email
        </a>
        .
      </p>
    </motion.section>
  );
}
