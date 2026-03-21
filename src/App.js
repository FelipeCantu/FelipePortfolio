import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Navbar/Sidebar';
import Home from './components/Home';
import Blog from './components/Blog';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import GetStarted from './components/GetStarted';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import SinglePost from './components/SinglePost';
import SingleProject from './components/SingleProject';
import About from './components/About';
import styled, { createGlobalStyle } from 'styled-components';
import LoadingComponent from './components/LoadingComponent';

const GlobalStyle = createGlobalStyle`
  /*
   * Minimal global overrides — typography, spacing, and color tokens
   * live in index.css. This only handles layout concerns for the app shell.
   */
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  * {
    box-sizing: border-box;
    max-width: 100%;
  }

  /* Ensure all headings use the display font set in index.css */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display, 'Syne', system-ui, sans-serif);
  }
`;

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // Sidebar open state lives here so Sidebar can be rendered outside Nav,
  // escaping the backdrop-filter stacking context that Nav creates.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const getLoadingMessage = (pathname) => {
    const cleanPath = pathname.split('?')[0].replace(/\/$/, '').toLowerCase() || '/';
    
    switch (cleanPath) {
      case '/':
      case '/home':
        return {
          title: 'Loading Home',
          status: 'Preparing workspace...'
        };
      case '/blog':
        return {
          title: 'Loading Blog',
          status: 'Fetching articles...'
        };
      case '/portfolio':
        return {
          title: 'Loading Portfolio',
          status: 'Showcasing projects...'
        };
      case '/contact':
        return {
          title: 'Loading Contact',
          status: 'Let\'s communicate...'
        };
      case '/about':
        return {
          title: 'About Me',
          status: 'Loading...'
        };
      case '/get-started':
        return {
          title: 'Start a Project',
          status: 'Preparing your intake form...'
        };
      default:
        if (cleanPath.startsWith('/post/')) {
          return {
            title: 'Loading Article',
            status: 'Retrieving content...'
          };
        }
        if (cleanPath.startsWith('/project/')) {
          return {
            title: 'Loading Project',
            status: 'Fetching project details...'
          };
        }
        return {
          title: 'Loading Page',
          status: 'Preparing content...'
        };
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    
    // Skip loading component for blog/project pages - let them handle their own loading
    if (location.pathname.startsWith('/post/') || location.pathname.startsWith('/project/')) {
      return;
    }
    
    setIsLoading(true);
    setLoadingMessage(getLoadingMessage(location.pathname));
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname, isFirstLoad]);

  if (isLoading) {
    return (
      <LoadingComponent
        loadingText={loadingMessage.title}
        statusText={loadingMessage.status}
      />
    );
  }

  return (
    <AppWrapper>
      <Navbar />

      {/*
       * Sidebar and its overlay are rendered here at the AppContent root,
       * NOT inside <Nav>. This is the fix for the z-index bug.
       *
       * Why it was broken: Nav has backdrop-filter: blur(), which per the
       * CSS spec creates a new stacking context. Any descendant z-index
       * value (no matter how large) is scoped to that context and can never
       * paint above sibling stacking contexts at a higher level. By moving
       * Sidebar to this level it paints in the root stacking context and
       * its z-index: 1300 wins over everything on the page.
       */}
      <SidebarOverlay $open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/*
       * Hamburger button lives here at the App root, NOT inside <Nav>.
       *
       * Nav has backdrop-filter: blur() which creates a CSS stacking context.
       * Any element rendered as a descendant of Nav has its z-index scoped to
       * that context — meaning even z-index: 9999 inside Nav loses to a sibling
       * at z-index: 1 in the root context. The sidebar panel is at z-index: 1300
       * in the root context, so it always painted over the old hamburger.
       *
       * By rendering HamburgerButton here (root context, z-index: 1400) it sits
       * above both the overlay (1299) and the sidebar panel (1300) unconditionally.
       */}
      <HamburgerButton
        $open={isSidebarOpen}
        onClick={() => setIsSidebarOpen(o => !o)}
        aria-label={isSidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isSidebarOpen}
        aria-controls="mobile-sidebar"
      >
        <span />
        <span />
        <span />
      </HamburgerButton>

      <MainContent>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/blog' component={Blog} />
          <Route path='/portfolio' render={() => <ScrollableWrapper><Portfolio /></ScrollableWrapper>} />
          <Route path='/contact' component={Contact} />
          <Route path='/about' component={About} />
          <Route path='/get-started' component={GetStarted} />
          <Route path='/post/:slug' component={SinglePost} />
          <Route path='/project/:slug' component={SingleProject} />
        </Switch>
      </MainContent>
    </AppWrapper>
  );
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContent />
    </Router>
  );
}

const AppWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
`;

const ScrollableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

/*
 * Full-screen dimming overlay that sits directly behind the sidebar panel.
 * Rendered at the AppContent root so it shares the root stacking context —
 * not trapped inside Nav's backdrop-filter stacking context.
 * pointer-events: none when closed so it never intercepts clicks.
 */
const SidebarOverlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 1299;
    background: rgba(0, 0, 0, 0.55);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
    transition: opacity 0.32s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

/*
 * Hamburger / X toggle button.
 *
 * z-index: 1400 — above sidebar panel (1300) and overlay (1299).
 * Hidden on desktop (>768px) via display:none; shown on mobile only.
 *
 * Animation: the three spans transform into an X when $open is true.
 *   Top span:    translateY(9px) + rotate(45deg)  → moves down to center, rotates
 *   Middle span: opacity 0                         → fades out
 *   Bottom span: translateY(-9px) + rotate(-45deg) → moves up to center, rotates
 *
 * The 9px offset = (button height 32px - bar height 2px) / (2 gaps between 3 bars)
 * ≈ half the pitch between bars, landing each outer bar exactly on the center line.
 */
const HamburgerButton = styled.button`
  /* Hidden on desktop — desktop nav links are always visible */
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 14px;
    right: 16px;
    width: 2rem;
    height: 2rem;
    padding: 3px 0;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1400;
  }

  span {
    display: block;
    width: 1.75rem;
    height: 2px;
    background: #ffffff;
    border-radius: 4px;
    transform-origin: center center;
    transition:
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      opacity   0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:nth-child(1) {
      transform: ${({ $open }) =>
        $open ? 'translateY(12px) rotate(45deg)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${({ $open }) => ($open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ $open }) =>
        $open ? 'translateY(-12px) rotate(-45deg)' : 'none'};
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.7);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export default App;