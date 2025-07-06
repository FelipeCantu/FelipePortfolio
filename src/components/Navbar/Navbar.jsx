import React, { useState, useRef, useEffect } from 'react';
import Menu from './Menu';
import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoError, setLogoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLogoError(false);
  };

  const handleImageError = () => {
    console.warn('Logo image failed to load, using fallback');
    setLogoError(true);
    setImageLoaded(false);
  };

  // Preload both images to prevent loading delays
  useEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          console.log(`✅ Successfully loaded: ${src}`);
          resolve();
        };
        img.onerror = () => {
          console.error(`❌ Failed to load: ${src}`);
          reject();
        };
        img.src = src;
      });
    };

    // Try different possible paths for the logo images
    const possiblePaths = [
      // Standard public folder paths
      { white: '/images/mainwlogo.png', blue: '/images/mainblogo.png' },
      { white: 'images/mainwlogo.png', blue: 'images/mainblogo.png' },
      { white: './images/mainwlogo.png', blue: './images/mainblogo.png' },
      
      // Alternative naming conventions
      { white: '/images/logo-white.png', blue: '/images/logo-blue.png' },
      { white: 'images/logo-white.png', blue: 'images/logo-blue.png' },
      
      // Check if you have different file extensions
      { white: '/images/mainwlogo.jpg', blue: '/images/mainblogo.jpg' },
      { white: 'images/mainwlogo.jpg', blue: 'images/mainblogo.jpg' },
    ];

    // Try each path until one works
    const tryPaths = async () => {
      for (const paths of possiblePaths) {
        try {
          await Promise.all([
            preloadImage(paths.white),
            preloadImage(paths.blue)
          ]);
          console.log('✅ Found working logo paths:', paths);
          setImageLoaded(true);
          setLogoError(false);
          return;
        } catch (error) {
          console.log('❌ Failed paths:', paths);
          continue;
        }
      }
      
      // If all paths fail, use fallback
      console.warn('⚠️ No logo images found, using fallback design');
      setLogoError(true);
      setImageLoaded(false);
    };

    tryPaths();
  }, []);

  return (
    <Nav>
      <LogoContainer>
        <LogoLink 
          to='/Home'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!logoError ? (
            <LogoImage 
              src={isHovered ? 'images/mainblogo.png' : 'images/mainwlogo.png'} 
              alt="Felipe Cantu Jr Logo" 
              $ishovered={isHovered}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: 'all 0.3s ease'
              }}
            />
          ) : (
            // Fallback logo when images fail to load
            <LogoFallback $ishovered={isHovered}>
              <LogoText $ishovered={isHovered}>FC</LogoText>
            </LogoFallback>
          )}
          
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
  height: 60px;
  animation: ${float} 3s ease-in-out infinite, ${pulse} 2s infinite;
  transition: all 0.3s ease;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transform: ${props => props.$ishovered ? 'scale(1.1)' : 'scale(1)'};
  filter: ${props => props.$ishovered ? 'drop-shadow(0 0 8px #1e90ff)' : 'none'};
  margin-left: 4px;
  object-fit: cover;
  
  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const LogoFallback = styled.div`
  width: 60px;
  height: 60px;
  background: ${props => props.$ishovered ? 
    'linear-gradient(135deg, #1e90ff, #0097e8)' : 
    'linear-gradient(135deg, #ffffff, #f8f9fa)'};
  color: ${props => props.$ishovered ? 'white' : '#1e90ff'};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 4px;
  animation: ${float} 3s ease-in-out infinite, ${pulse} 2s infinite;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$ishovered ? '#1e90ff' : 'rgba(30, 144, 255, 0.3)'};
  transform: ${props => props.$ishovered ? 'scale(1.1)' : 'scale(1)'};
  filter: ${props => props.$ishovered ? 'drop-shadow(0 0 8px #1e90ff)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'};
  box-shadow: ${props => props.$ishovered ? 
    '0 0 20px rgba(30, 144, 255, 0.3)' : 
    '0 2px 8px rgba(0, 0, 0, 0.1)'};
  
  @media (max-width: 400px) {
    width: 50px;
    height: 50px;
    margin-top: 10px;
  }
`;

const LogoText = styled.span`
  font-weight: 700;
  font-size: 20px;
  font-family: 'Inter', 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  text-shadow: ${props => props.$ishovered ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'};
  
  @media (max-width: 400px) {
    font-size: 18px;
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
    color: #0097e8;
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