import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Sidebar = ({ open }) => {
  return (
    <div>
      <nav>
        <Ul open={open}>
          <li><StyledLink to="/Home">Home</StyledLink></li>
          <li><StyledLink to="/Blog">Blogs</StyledLink></li>
          <li><StyledLink to="/Portfolio">Portfolio</StyledLink></li>
          <li><StyledLink to="/Contact"><Button>Contact</Button></StyledLink></li>
        </Ul>
      </nav>
    </div>
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
  padding: 6px 13px 6px 13px;
  border-radius: 10px;
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