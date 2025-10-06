import React, { useState, useEffect } from 'react';
import Project from './Project';
import { Helmet } from 'react-helmet-async';
import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';
import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

function Portfolio() {
  return (
    <PortfolioWrapper>
      <Helmet>
        <title>Portfolio | Felipe Cantu Jr</title>
        <meta name="description" content="Explore my collection of projects showcasing full-stack development skills with JavaScript, React, and beautiful Figma designs." />
        <link rel="canonical" href="/Portfolio" />
      </Helmet>
      
      <BackgroundOverlay>
        <BackgroundPattern />
      </BackgroundOverlay>
      
      <ScrollToTopButton />
      
      <ContentWrapper>
        <PortfolioHeader>
          <HeaderContent>
            <TitleContainer>
              <Title variant="h2">
                My Creative Portfolio
              </Title>
              <AccentLine />
            </TitleContainer>
            <Subtitle variant="subtitle1">
              Explore my collection of projects showcasing full-stack development skills with 
              JavaScript, React, and beautiful Figma designs.
            </Subtitle>
          </HeaderContent>
        </PortfolioHeader>
        
        <ProjectSection>
          <Project />
        </ProjectSection>
      </ContentWrapper>
    </PortfolioWrapper>
  );
}

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <ScrollButton
      onClick={scrollToTop}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <FiArrowUp size={24} />
    </ScrollButton>
  );
};

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// STYLED COMPONENTS
const PortfolioWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  
  @media (max-width: 480px) {
    padding-top: 70px;
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('images/mainbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 30, 0.75);
    backdrop-filter: blur(1px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.8rem;
  }
`;

const PortfolioHeader = styled.header`
  text-align: center;
  padding: 4rem 0 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 2rem 0 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0 1.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled(Typography)`
  && {
    font-size: 3.5rem;
    font-weight: 800;
    color: white;
    margin: 0;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    letter-spacing: -1px;
    line-height: 1.1;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
`;

const AccentLine = styled.div`
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcf7f, #4d9de0);
  background-size: 300% 300%;
  border-radius: 2px;
  animation: ${gradientShift} 3s ease infinite;
  
  @media (max-width: 480px) {
    width: 70px;
    height: 3px;
    bottom: -10px;
  }
`;

const Subtitle = styled(Typography)`
  && {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin: 0;
    font-weight: 300;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      padding: 0 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.95rem;
      padding: 0 0.5rem;
    }
  }
`;

const ProjectSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 4rem;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 15px;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem 0.8rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
`;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3498db, #9b59b6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: opacity 0.3s, transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export default Portfolio;