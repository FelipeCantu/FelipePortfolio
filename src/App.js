import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Blog from './components/Blog'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Redirect, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Navbar />
          <Redirect to="/Home" />
          <Route path="/Home" component={Home} />
        <Route path='/Blog'>
          <Blog />
        </Route>
        <Route path='/Blog'>
          <Blog />
        </Route>
        <Route path='/Portfolio'>
          <Portfolio />
        </Route>
        <Route path='/Contact'>
          <Contact />
        </Route>
      </Router>
    </BrowserRouter>
  );
}

export default App;