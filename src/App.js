import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Blog from './components/Blog'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import SinglePost from './components/SinglePost';
import styled from 'styled-components';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route path='/Home' component={Home} />
        <Route path='/Blog'>
          <Blog />
        </Route>
        <Route path='/Portfolio'>
          <Portfolio />
        </Route>
        <Route path='/Contact'>
          <Contact />
        </Route>
        <Overflow>
          <Route path='/post/:slug'>
            <SinglePost />
          </Route>
          <Route path='Blog/:slug'>
            <SinglePost />
          </Route>
          <Route path='Portfolio/:slug'>
            <SinglePost />
          </Route>
        </Overflow>
      </Switch>
    </Router>
  );
}

const Overflow = styled.div `
  padding-top: 100px;
  height: 100vh;
  overflow: auto;
  position: absolute;
  z-index: -1;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default App;