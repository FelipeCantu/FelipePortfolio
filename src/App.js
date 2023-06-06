import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import Blog from './components/Blog'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
       <Router>
        <Navbar />
           <Route path='/Home' exact>
            <Home />
           </Route>
           <Route path='/Blog' exact>
            <Blog />
           </Route>
           <Route path='/Blog' exact>
            <Blog />
           </Route>
           <Route path='/Portfolio' exact>
            <Portfolio />
           </Route>
           <Route path='/Contact' exact>
            <Contact /> 
           </Route>
        </Router>
    </BrowserRouter>
  );
}

export default App;