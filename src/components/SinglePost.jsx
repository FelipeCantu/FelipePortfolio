import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import styled, { keyframes } from "styled-components";
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    block: (props) => {
      const { style = 'normal' } = props.node;
      
      if (style === 'h1') {
        return <StyledH1>{props.children}</StyledH1>;
      }
      if (style === 'h2') {
        return <StyledH2>{props.children}</StyledH2>;
      }
      if (style === 'h3') {
        return <StyledH3>{props.children}</StyledH3>;
      }
      if (style === 'h4') {
        return <StyledH4>{props.children}</StyledH4>;
      }
      if (style === 'blockquote') {
        return <StyledBlockquote>{props.children}</StyledBlockquote>;
      }
      
      // Normal paragraph
      return <StyledParagraph>{props.children}</StyledParagraph>;
    },
    image: ({ node }) => (
      <ImageContainer>
        <img
          src={urlFor(node.asset).url()}
          alt={node.alt || 'Article image'}
          className="block-content-image"
        />
        {node.caption && <p className="block-content-caption">{node.caption}</p>}
      </ImageContainer>
    ),
  },
  marks: {
    strong: (props) => <StyledStrong>{props.children}</StyledStrong>,
    em: (props) => <StyledEm>{props.children}</StyledEm>,
    underline: (props) => <StyledUnderline>{props.children}</StyledUnderline>,
    'strike-through': (props) => <StyledStrikethrough>{props.children}</StyledStrikethrough>,
    code: (props) => <StyledInlineCode>{props.children}</StyledInlineCode>,
    link: (props) => (
      <StyledLink href={props.mark.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </StyledLink>
    ),
  },
  list: (props) => {
    const { type } = props;
    if (type === 'bullet') {
      return <StyledUL>{props.children}</StyledUL>;
    }
    if (type === 'number') {
      return <StyledOL>{props.children}</StyledOL>;
    }
    return <ul>{props.children}</ul>;
  },
  listItem: (props) => <StyledLI>{props.children}</StyledLI>,
};

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,
          _id,
          slug,
          publishedAt,
          _createdAt,
          mainImage{
              asset->{
                  _id,
                  url
              },
              alt
          },
          body,
          "name": author->name,
          "authorImage": author->image
      }`
      )
      .then((data) => {
        if (data && data[0]) {
          const post = data[0];
          // Calculate reading time
          const wordCount = post.body ? 
            post.body.reduce((acc, block) => {
              if (block._type === 'block' && block.children) {
                const text = block.children
                  .filter(child => child._type === 'span')
                  .map(span => span.text)
                  .join('');
                return acc + text.split(' ').length;
              }
              return acc;
            }, 0) : 0;
          
          post.estimatedReadingTime = Math.max(1, Math.round(wordCount / 200));
          post.displayDate = post.publishedAt || post._createdAt;
          setSinglePost(post);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <BackgroundOverlay>
          <BackgroundPattern />
        </BackgroundOverlay>
        <LoadingContent>
          <LoadingSpinner />
          <LoadingText>Loading article...</LoadingText>
        </LoadingContent>
      </LoadingContainer>
    );
  }

  if (!singlePost) {
    return (
      <ErrorContainer>
        <BackgroundOverlay>
          <BackgroundPattern />
        </BackgroundOverlay>
        <ErrorContent>
          <ErrorIcon>📄</ErrorIcon>
          <ErrorTitle>Article Not Found</ErrorTitle>
          <ErrorMessage>The article you're looking for doesn't exist or has been moved.</ErrorMessage>
          <BackButton to="/blog">
            <FiArrowLeft />
            <span>Back to Blog</span>
          </BackButton>
        </ErrorContent>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{singlePost.title} | Felipe Cantu Jr</title>
        <meta name="description" content={`Read "${singlePost.title}" - An insightful article about web development and technology.`} />
        <link rel="canonical" href={`/post/${slug}`} />
      </Helmet>
      
      <PostContainer>
        <BackgroundOverlay>
          <BackgroundPattern />
        </BackgroundOverlay>
        
        <ContentWrapper>
          <BackButton to="/blog">
            <FiArrowLeft />
            <span>Back to Blog</span>
          </BackButton>
          
          <ArticleCard>
            <ArticleHeader>
              {singlePost.mainImage && (
                <HeroImage>
                  <img 
                    src={singlePost.mainImage.asset.url} 
                    alt={singlePost.mainImage.alt || singlePost.title}
                  />
                  <ImageOverlay />
                </HeroImage>
              )}
              
              <HeaderContent $hasImage={!!singlePost.mainImage}>
                <PostMeta>
                  {singlePost.authorImage && singlePost.name && (
                    <AuthorInfo>
                      <AuthorAvatar>
                        <img
                          src={urlFor(singlePost.authorImage).url()}
                          alt={singlePost.name}
                        />
                      </AuthorAvatar>
                      <AuthorDetails>
                        <AuthorName>{singlePost.name}</AuthorName>
                        <MetaItems>
                          <MetaItem>
                            <FiCalendar size={14} />
                            <span>
                              {new Date(singlePost.displayDate).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </MetaItem>
                          <MetaItem>
                            <FiClock size={14} />
                            <span>{singlePost.estimatedReadingTime} min read</span>
                          </MetaItem>
                        </MetaItems>
                      </AuthorDetails>
                    </AuthorInfo>
                  )}
                </PostMeta>
                
                <PostTitle>{singlePost.title}</PostTitle>
              </HeaderContent>
            </ArticleHeader>
            
            <ArticleContent>
              <BlockContent
                blocks={singlePost.body}
                projectId="r99w5jgb"
                dataset="production"
                serializers={serializers}
              />
            </ArticleContent>
          </ArticleCard>
        </ContentWrapper>
      </PostContainer>
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

// Styled Components
const PostContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-top: 80px;
  z-index: 1;
`;

const LoadingContainer = styled(PostContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorContainer = styled(PostContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-5px);
  }
`;

const ArticleCard = styled.article`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  animation: ${fadeInUp} 0.8s ease-out;
  margin-bottom: 2rem;
`;

const ArticleHeader = styled.header`
  position: relative;
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
`;

const HeaderContent = styled.div`
  padding: ${props => props.$hasImage ? '2rem' : '3rem 2rem 2rem'};
  
  @media (max-width: 768px) {
    padding: ${props => props.$hasImage ? '1.5rem' : '2rem 1.5rem 1.5rem'};
  }
`;

const PostMeta = styled.div`
  margin-bottom: 1.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AuthorName = styled.h3`
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const MetaItems = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #6b7280;
  font-size: 0.9rem;
  
  svg {
    color: #667eea;
  }
`;

const PostTitle = styled.h1`
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const ArticleContent = styled.div`
  padding: 0 2rem 3rem;
  color: #374151;
  line-height: 1.8;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem;
    font-size: 1rem;
  }
`;

// Enhanced styled components for rich text formatting
const StyledH1 = styled.h1`
  color: #1f2937;
  font-weight: 800;
  font-size: 2.25rem;
  margin: 2.5rem 0 1.5rem 0;
  line-height: 1.2;
  border-bottom: 3px solid #667eea;
  padding-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StyledH2 = styled.h2`
  color: #1f2937;
  font-weight: 700;
  font-size: 1.875rem;
  margin: 2rem 0 1rem 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StyledH3 = styled.h3`
  color: #1f2937;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1.75rem 0 1rem 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
`;

const StyledH4 = styled.h4`
  color: #1f2937;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 1.5rem 0 0.75rem 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const StyledParagraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledBlockquote = styled.blockquote`
  border-left: 4px solid #667eea;
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  font-style: italic;
  color: #4b5563;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(102, 126, 234, 0.02));
  border-radius: 0 12px 12px 0;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #667eea;
    opacity: 0.3;
    font-family: Georgia, serif;
  }
  
  p {
    margin-bottom: 0;
    font-size: 1.125rem;
  }
`;

const StyledStrong = styled.strong`
  font-weight: 700;
  color: #1f2937;
`;

const StyledEm = styled.em`
  font-style: italic;
  color: #4b5563;
`;

const StyledUnderline = styled.span`
  text-decoration: underline;
  text-decoration-color: #667eea;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
`;

const StyledStrikethrough = styled.span`
  text-decoration: line-through;
  text-decoration-color: #ef4444;
  opacity: 0.7;
`;

const StyledInlineCode = styled.code`
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875em;
  color: #667eea;
  border: 1px solid #e5e7eb;
`;

const StyledLink = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    color: #5a67d8;
    border-bottom-color: #5a67d8;
    background: rgba(102, 126, 234, 0.05);
    padding: 0 2px;
    border-radius: 3px;
  }
`;

const StyledUL = styled.ul`
  margin: 1.5rem 0;
  padding-left: 2rem;
  list-style: none;
  
  li {
    position: relative;
    margin-bottom: 0.75rem;
    line-height: 1.7;
    
    &::before {
      content: '•';
      color: #667eea;
      font-weight: bold;
      position: absolute;
      left: -1.5rem;
      font-size: 1.2em;
    }
  }
`;

const StyledOL = styled.ol`
  margin: 1.5rem 0;
  padding-left: 2rem;
  
  li {
    margin-bottom: 0.75rem;
    line-height: 1.7;
    
    &::marker {
      color: #667eea;
      font-weight: 600;
    }
  }
`;

const StyledLI = styled.li`
  margin-bottom: 0.75rem;
  line-height: 1.7;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin: 2.5rem 0;
  
  img.block-content-image {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
    }
  }
  
  p.block-content-caption {
    font-size: 0.9rem;
    color: #6b7280;
    font-style: italic;
    margin-top: 1rem;
    padding: 0 1rem;
    line-height: 1.5;
  }
`;

const LoadingContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 1rem;
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
`;

const ErrorContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 2rem;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;