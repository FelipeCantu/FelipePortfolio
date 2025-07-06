import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import SinglePost from './components/SinglePost';
import styled, { createGlobalStyle } from 'styled-components';
import LoadingComponent from './components/LoadingComponent';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto !important;
  }
  
  * {
    box-sizing: border-box;
    max-width: 100%;
  }
`;

function AppContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const location = useLocation();

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
      default:
        if (cleanPath.startsWith('/post/')) {
          return {
            title: 'Loading Article',
            status: 'Retrieving content...'
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
      <MainContent>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/blog' component={Blog} />
          <Route path='/portfolio' render={() => <ScrollableWrapper><Portfolio /></ScrollableWrapper>} />
          <Route path='/contact' component={Contact} />
          <Route path='/post/:slug' component={SinglePost} />
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

export default App;