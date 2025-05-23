import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Blog from './components/Blog'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import SinglePost from './components/SinglePost';
import styled, { createGlobalStyle } from 'styled-components';

// Create a global style to ensure scrolling works
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

function App() {
  return (
    <Router>
      <GlobalStyle />
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
    </Router>
  );
}

// Basic structure that ensures content flows properly
const AppWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

// Main content area takes remaining space
const MainContent = styled.main`
  flex: 1;
  width: 100%;
  position: relative;
`;

// Special wrapper just for Portfolio to ensure it scrolls
const ScrollableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: relative;
`;

export default App;