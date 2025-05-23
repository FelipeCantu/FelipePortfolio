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
          <li className="contact-item"><ContactButton to="/Contact">Contact</ContactButton></li>
        </Ul>
      </nav>
    </div>
  )
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0;
  padding: 0 200px 0 0; /* Match the logo's left padding (200px) on the right */
  z-index: 8;
  width: 100%;
  justify-content: flex-end; /* Align items to the right */

  li {
    color: #fff;
    margin: 20px;
    position: relative;
    bottom: 15px;
  }

  /* Special styling for contact item on desktop */
  li.contact-item {
    margin-left: 20px;
    padding: 1.5px;
  }

  @media (max-width: 1250px) {
    padding-right: 10px; /* Match the logo's responsive adjustment */
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0077b5;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding: 3.5rem 0 0 0;
    transition: transform 0.3s ease-in-out;
    justify-content: flex-start;
    align-items: flex-start;

    li {
      padding: 15px 25px;
      width: 100%;
    }

    li.contact-item {
      margin-left: 10;
      padding: 0 20px;
      bottom: -3px;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  
  &:hover {
    color: black;
  }
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background-color: #0077b5;
  padding: 10px 20px;
  border-radius: 30px;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  transition: all 0.3s ease;
  border: 2px solid #0077b5;
  
  &:hover {
    background-color: transparent;
    color: #0077b5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    background-color: transparent;
    border: none;
    padding: 0;
    border-radius: 0;
    color: #fff;
    
    &:hover {
      background-color: transparent;
      color: black;
      transform: none;
      box-shadow: none;
    }
  }
`;

export default Sidebar;