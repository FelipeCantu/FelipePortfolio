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
        <li><StyledLink to="/contact"><Button>Contact</Button></StyledLink></li>
      </Ul>
    </Router>
  )
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-right: 200px;
  z-index: 8;
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
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-family: Arial, Helvetica, 
    sans-serif;
  :hover {
    color: black;
  }
`;

const Button = styled.button`
  background-color: #0077b5;
  padding: 6px 10px 6px 10px;
  border-radius: 10%;
  border: none;
  color: #fff;
  font-size: 1rem;
  margin-top: -2px;
  @media (max-width: 768px) {
    background-color: none;
    padding: 0;
    font-size: 1rem;
  }
  :hover {
    color: black;
  }
`;

export default Sidebar