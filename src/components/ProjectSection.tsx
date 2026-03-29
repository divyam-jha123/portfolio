import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data';

export function ProjectSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Projects</div>
      <p className="tech-stack-description">
        Here are some of the projects I've built -
      </p>
      
      <div className="project-grid">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
          >
            <div className="project-title">
              {project.title}
              <ExternalLink size={16} className="external-link-icon" style={{ opacity: 1, color: "var(--text-tertiary)" }} />
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((techItem) => (
                <span key={techItem} className="project-tech-badge">
                  {techItem}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}
