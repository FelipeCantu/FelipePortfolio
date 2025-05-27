import React, { useState, useRef } from 'react';
import Menu from './Menu';
import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <Nav>
      <LogoContainer>
        <LogoLink 
          to='/Home'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <LogoImage 
            src={isHovered ? 'images/mainblogo.png' : 'images/mainwlogo.png'} 
            alt="Logo" 
            $ishovered={isHovered}
          />
          <TextContainer
            ref={textRef}
            onMouseMove={handleMouseMove}
          >
            <BaseText>Felipe Cantu Jr</BaseText>
            <HoverText 
              $ishovered={isHovered}
              $mouseX={mousePosition.x}
              $mouseY={mousePosition.y}
            >
              Felipe Cantu Jr
            </HoverText>
          </TextContainer>
        </LogoLink>
      </LogoContainer>
      <Menu />
    </Nav>
  );
};

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(30, 144, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(30, 144, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(30, 144, 255, 0); }
`;

// Styled Components
const Nav = styled.nav`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  background: rgba(128,128,128,0.5);
  justify-content: space-between;
  padding-left: 200px;
  z-index: 1000;

  @media (max-width: 1250px) {
    padding-left: 10px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  height: 100%;
`;

const LogoImage = styled.img`
  width: 60px;
  animation: ${float} 3s ease-in-out infinite, ${pulse} 2s infinite;
  transition: all 0.3s ease;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transform: ${props => props.$ishovered ? 'scale(1.1)' : 'scale(1)'};
  filter: ${props => props.$ishovered ? 'drop-shadow(0 0 8px #1e90ff)' : 'none'};
  margin-left: 4px;
  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const TextContainer = styled.div`
  position: relative;
  display: inline-block;
  padding-left: 20px;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 400px) {
    padding-left: 60px;
  }
`;

const BaseText = styled(Typography)`
  && {
    font-family: 'Inter', 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 1.5em;
    letter-spacing: 0.5px;
    color: white;
    margin: 0;
    display: flex;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
      font-size: 1.3em;
      font-weight: 500;
    }

    @media (max-width: 400px) {
      font-size: 1.1em;
    }
  }
`;

const HoverText = styled(Typography)`
  && {
    position: absolute;
    top: 0;
    left: 20px;
    height: 100%;
    font-family: 'Inter', 'Roboto', sans-serif;
    font-weight: 600;
    font-size: 1.5em;
    letter-spacing: 0.5px;
    color: #0097e8; /* Your requested cyan color */
    margin: 0;
    display: flex;
    align-items: center;
    clip-path: circle(30px at ${props => props.$mouseX}px ${props => props.$mouseY}px);
    opacity: ${props => props.$ishovered ? 1 : 0};
    transition: opacity 0.2s ease;
    pointer-events: none;

    @media (max-width: 768px) {
      font-size: 1.3em;
      font-weight: 500;
    }

    @media (max-width: 400px) {
      font-size: 1.1em;
      left: 60px;
    }
  }
`;

export default Navbar;