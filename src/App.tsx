import { useEffect, useLayoutEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle';
import { Dock } from './components/Dock';
import { SideNav } from './components/SideNav';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { ProjectSection } from './components/ProjectSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { TechStackSection } from './components/TechStackSection';

import { BlogSection } from './components/BlogSection';
import { AboutSection } from './components/AboutSection';
import { BeyondCodeSection } from './components/BeyondCodeSection';
import { ContactSection } from './components/ContactSection';
import { WritingPage, NotFoundPage } from './components/WritingPage';
import { SeriesPage } from './components/SeriesPage';
import { usePathname } from './router';
import { writingRoutes, seriesRoutes } from './data';

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
      <BeyondCodeSection />
      <ContactSection />
    </>
  );
}

function App() {
  const pathname = usePathname();

  // /writing/<slug> is a standalone post; /writing/<slug>/<n> is part n of a
  // series (no n means its first part).
  const segments = pathname.startsWith('/writing/')
    ? pathname.slice('/writing/'.length).split('/')
    : [];
  const series = seriesRoutes.find((entry) => entry.slug === segments[0]);
  const partNumber = series && segments[1] !== undefined ? Number(segments[1]) : undefined;
  const route =
    !series && segments.length === 1
      ? writingRoutes.find((entry) => entry.slug === segments[0])
      : undefined;

  const isHome = pathname === '/';

  // The post title arrives with the fetch, so the tab keeps a stable name and
  // the page sets the specific one once it has the content.
  useEffect(() => {
    if (!route && !series) document.title = SITE_TITLE;
  }, [route, series]);

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
      <main
        className={`portfolio-container${series ? ' portfolio-container--wide' : ''}`}
        id="main"
      >
        {isHome ? (
          <Portfolio />
        ) : series ? (
          <SeriesPage
            slug={series.slug}
            seriesSlug={series.seriesSlug}
            eyebrow={series.eyebrow}
            partNumber={partNumber}
          />
        ) : route ? (
          <WritingPage postId={route.postId} />
        ) : (
          <NotFoundPage />
        )}
      </main>
      {isHome && <SideNav />}
      <Dock />
    </MotionConfig>
  );
}

export default App;
