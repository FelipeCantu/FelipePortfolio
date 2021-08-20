import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ open }) => {
    return (
      <Ul open={open}>
        <li>Home</li>
        <li>Blogs</li>
        <li>Project</li>
        <li>Contact</li>
      </Ul>
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
    right: -200px;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export default Sidebar