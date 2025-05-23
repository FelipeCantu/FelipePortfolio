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
      
      <ScrollToTopButton />
      
      <PortfolioHeader>
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
      </PortfolioHeader>
      
      <ProjectSection>
        <Project />
      </ProjectSection>
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

// STYLED COMPONENTS - UPDATED TO PUSH CONTENT BELOW NAVBAR
const PortfolioWrapper = styled.div`
  width: 100%;
  padding: 100px 0 100px; /* Added top padding to push content down */
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  min-height: 100vh;
`;

const PortfolioHeader = styled.header`
  max-width: 70%;
  margin: 0 auto 3rem;
  text-align: center;
  padding-top: 20px; /* Additional padding if needed */
`;

const TitleContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 2.5rem;
`;

const Title = styled(Typography)`
  && {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    color: #2c3e50;
    font-size: 3rem;
    letter-spacing: -0.5px;
    margin-top: 20px; /* Added margin to push title down further */
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
`;

const AccentLine = styled.div`
  position: absolute;
  width: 80px;
  height: 5px;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #3498db, #9b59b6);
  border-radius: 3px;
`;

const Subtitle = styled(Typography)`
  && {
    color: #5a6a7a;
    line-height: 1.7;
    font-size: 1.3rem;
    max-width: 800px;
    margin: 0 auto;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      padding: 0 0.5rem;
    }
  }
`;

const ProjectSection = styled.section`
  max-width: 70%;
  margin: 0 auto;
  width: 100%;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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
`;

export default Portfolio;