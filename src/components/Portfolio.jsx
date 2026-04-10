import React, { useState, useEffect } from 'react';
import Project from './Project';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { FiArrowUp } from 'react-icons/fi';

function Portfolio() {
  return (
    <PortfolioWrapper>
      <Helmet>
        <title>Portfolio | Felipe Cantu Jr</title>
        <meta name="description" content="A collection of full-stack projects by Felipe Cantu Jr — React, JavaScript, and Figma." />
        <link rel="canonical" href="https://felipecantujr.com/portfolio" />
        <meta property="og:title" content="Portfolio | Felipe Cantu Jr" />
        <meta property="og:description" content="A collection of full-stack projects by Felipe Cantu Jr — React, JavaScript, and Figma." />
        <meta property="og:url" content="https://felipecantujr.com/portfolio" />
        <meta property="og:type" content="website" />
      </Helmet>

      <BackgroundOverlay>
        <BackgroundPattern />
      </BackgroundOverlay>

      <ScrollToTopButton />

      <CarouselSection>
        <Project />
      </CarouselSection>
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

const CarouselSection = styled.section`
  width: 100%;
  overflow-x: clip;
  padding-bottom: 4rem;
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
