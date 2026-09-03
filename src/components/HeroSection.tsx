import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';

export function HeroSection() {
  const [time, setTime] = useState(getISTTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getISTTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="hero-image" role="presentation" aria-hidden="true" />

      <h1 className="hero-name-sr">{personalInfo.name}</h1>

      <div className="hero-meta">
        <span>{personalInfo.pronunciation}</span>
        <span className="dot">•</span>
        <span>{personalInfo.partOfSpeech}</span>
        <span className="dot">•</span>
        <span>{time} IST</span>
      </div>

      <div className="hero-bio">
        {personalInfo.bio.map((item, index) => (
          <p key={index}>
            {item.text}
            {item.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {link.label}
              </a>
            ))}
            {item.suffix}
          </p>
        ))}
      </div>
    </motion.section>
  );
}

const istFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

function getISTTime(): string {
  return istFormatter.format(new Date());
}
