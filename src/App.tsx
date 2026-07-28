import { ThemeToggle } from './components/ThemeToggle';
import { Dock } from './components/Dock';
import { HeroSection } from './components/HeroSection';
import { ProjectSection } from './components/ProjectSection';
import { InBetweenSection } from './components/InBetweenSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { TechStackSection } from './components/TechStackSection';

import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <>
      <ThemeToggle />
      <main className="portfolio-container">
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
    </>
  );
}

export default App;
