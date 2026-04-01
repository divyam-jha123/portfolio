import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
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
          <div key={index} className="project-card">
            <div className="project-title">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-title-link"
              >
                {project.title}
              </a>
              <div className="project-title-icons">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-icon-link"
                  aria-label={`${project.title} — live site`}
                >
                  <ExternalLink size={16} />
                </a>
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-icon-link"
                  aria-label={`${project.title} — GitHub repository`}
                >
                  <FaGithub size={16} />
                </a>
              </div>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.tech.map((techItem) => (
                <span key={techItem} className="project-tech-badge">
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
