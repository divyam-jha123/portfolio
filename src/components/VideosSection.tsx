import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { explainerVideos } from '../data';

export function VideosSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Explainer Videos</div>
      <p className="videos-description">
        here is how i explain complex systems on my{' '}
        <a
          href={explainerVideos.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          youtube channel
        </a>
      </p>
      {explainerVideos.videos.map((video, index) => (
        <div key={index} style={{ marginBottom: 12 }}>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            watch me build {video.title.toLowerCase()} <ExternalLink size={14} />
          </a>
        </div>
      ))}
    </motion.section>
  );
}
