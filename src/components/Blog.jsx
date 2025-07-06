import React from 'react';
import styled, { keyframes } from "styled-components";
import Post from './Post'
import { Helmet } from 'react-helmet-async'

function Blog() {
  return (
   <>
    <Helmet>
      <title>Blog | Felipe Cantu Jr</title>
      <meta name="description" content="Explore insightful articles about web development, technology trends, and programming best practices." />
      <link rel="canonical" href="/blog" />
    </Helmet>
    
    <BlogContainer>
      <BackgroundOverlay>
        <BackgroundPattern />
      </BackgroundOverlay>
      
      <ContentWrapper>
        <BlogHeader>
          <HeaderContent>
            <TitleContainer>
              <BlogTitle>Latest Articles</BlogTitle>
              <TitleUnderline />
            </TitleContainer>
            <BlogSubtitle>
              Discover insights about web development, technology trends, and programming best practices
            </BlogSubtitle>
          </HeaderContent>
        </BlogHeader>
        
        <PostSection>
          <Post />
        </PostSection>
      </ContentWrapper>
    </BlogContainer>
   </>
  );
}

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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const BlogContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px; /* Space for navbar */
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
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
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const BlogHeader = styled.header`
  text-align: center;
  padding: 4rem 0 3rem;
  animation: ${fadeInUp} 0.8s ease-out;
  
  @media (max-width: 768px) {
    padding: 2rem 0 2rem;
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
`;

const BlogTitle = styled.h1`
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
    font-size: 2rem;
  }
`;

const TitleUnderline = styled.div`
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
`;

const BlogSubtitle = styled.p`
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
`;

const PostSection = styled.section`
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
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }
`;

export default Blog;