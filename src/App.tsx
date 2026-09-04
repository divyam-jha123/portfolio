import { useEffect, useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { Dock } from './components/Dock';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { ProjectSection } from './components/ProjectSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { TechStackSection } from './components/TechStackSection';

import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { WritingPage, NotFoundPage } from './components/WritingPage';
import { usePathname } from './router';
import { writingRoutes } from './data';

const SITE_TITLE = 'Divyam Jha — Portfolio';

function Portfolio() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <ProjectSection />
      <ExperienceSection />
      <EducationSection />
      <TechStackSection />
      <BlogSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

function App() {
  const pathname = usePathname();

  const route = pathname.startsWith('/writing/')
    ? writingRoutes.find((entry) => entry.slug === pathname.slice('/writing/'.length))
    : undefined;

  const isHome = pathname === '/';

  // The post title arrives with the fetch, so the tab keeps a stable name and
  // WritingPage sets the specific one once it has the content.
  useEffect(() => {
    if (!route) document.title = SITE_TITLE;
  }, [route]);

  // A route change is a new page: start it at the top, the way a load would.
  // Before paint, and explicitly instant — the stylesheet sets
  // `scroll-behavior: smooth`, which would otherwise animate this scroll and
  // let the incoming route's layout interrupt it partway.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <ThemeToggle />
      <main className="portfolio-container" id="main">
        {isHome ? (
          <Portfolio />
        ) : route ? (
          <WritingPage postId={route.postId} />
        ) : (
          <NotFoundPage />
        )}
      </main>
      <Dock />
    </MotionConfig>
  );
}

export default App;
