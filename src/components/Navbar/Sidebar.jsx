import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../Home';
import Blogs from '../Blog';
import Projects from '../Projects';
import Contact from '../Contact';

const Sidebar = ({ open }) => {
  return (
    <Router>
      <Ul open={open}>
        <li><StyledLink to="/">Home</StyledLink></li>
        <li><StyledLink to="/blogs">Blogs</StyledLink></li>
        <li><StyledLink to="/projects">Project</StyledLink></li>
        <li><StyledLink to="/contact">Contact</StyledLink></li>
      </Ul>
    </Router>
  )
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-right: 200px;
  li {
    color: #fff;
    padding: 18px 10px;
  }
  @media (max-width: 1250px) {
     margin-right: 0;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0077b5;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: -100px;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  
`;

export default Sidebar