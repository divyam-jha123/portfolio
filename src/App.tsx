import { MotionConfig } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { Dock } from './components/Dock';
import { HeroSection } from './components/HeroSection';
import { ProjectSection } from './components/ProjectSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { TechStackSection } from './components/TechStackSection';

import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <ThemeToggle />
      <main className="portfolio-container" id="main">
        <HeroSection />
        <ProjectSection />
        <ExperienceSection />
        <EducationSection />
        <TechStackSection />
        <BlogSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Dock />
    </MotionConfig>
  );
}

export default App;
