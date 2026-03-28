import { ThemeToggle } from './components/ThemeToggle';
import { Dock } from './components/Dock';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { InBetweenSection } from './components/InBetweenSection';
import { EducationSection } from './components/EducationSection';
import { TechStackSection } from './components/TechStackSection';
import { VideosSection } from './components/VideosSection';
import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

function App() {
  return (
    <>
      <ThemeToggle />
      <main className="portfolio-container">
        <HeroSection />
        <hr className="divider" />
        <ProjectSection />
        <hr className="divider" />
        <InBetweenSection />
        <hr className="divider" />
        <EducationSection />
        <hr className="divider" />
        <TechStackSection />
        <hr className="divider" />
        <VideosSection />
        <hr className="divider" />
        <BlogSection />
        <hr className="divider" />
        <AboutSection />
        <hr className="divider" />
        <ContactSection />
      </main>
      <Dock />
    </>
  );
}

export default App;
