import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import styled, { keyframes } from "styled-components";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

export default function Post() {
    const [postData, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        sanityClient
            .fetch(
                `*[_type == "post"]{
                    title,
                    slug,
                    publishedAt,
                    _createdAt,
                    body,
                    mainImage{
                        asset->{
                            _id,
                            url
                        },
                        alt
                    }
                }`
            )
            .then((data) => {
                console.log('Fetched posts:', data); // Debug log
                
                // Process the data to add computed fields
                const processedData = data.map(post => ({
                    ...post,
                    displayDate: post.publishedAt || post._createdAt,
                    estimatedReadingTime: post.body ? Math.max(1, Math.round(
                        post.body.reduce((acc, block) => {
                            if (block._type === 'block' && block.children) {
                                const text = block.children
                                    .filter(child => child._type === 'span')
                                    .map(span => span.text)
                                    .join('');
                                return acc + text.length;
                            }
                            return acc;
                        }, 0) / 1000
                    )) : 1,
                    excerpt: post.body ? 
                        post.body
                            .filter(block => block._type === 'block' && block.children)
                            .slice(0, 2)
                            .map(block => 
                                block.children
                                    .filter(child => child._type === 'span')
                                    .map(span => span.text)
                                    .join('')
                            )
                            .join(' ')
                            .substring(0, 150) + '...'
                        : 'Click to read this article...'
                })).sort((a, b) => new Date(b.displayDate) - new Date(a.displayDate));
                
                setPost(processedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <LoadingContainer><LoadingSpinner /></LoadingContainer>;
    }

    if (!postData || postData.length === 0) {
        return (
            <EmptyState>
                <EmptyIcon>📝</EmptyIcon>
                <EmptyTitle>No Posts Yet</EmptyTitle>
                <EmptyMessage>Check back soon for new articles and insights!</EmptyMessage>
            </EmptyState>
        );
    }

    return (
        <PostContainer>
            <SectionHeader>
                <SectionTitle>Recent Posts</SectionTitle>
                <SectionSubtitle>
                    {postData.length} article{postData.length !== 1 ? 's' : ''} available
                </SectionSubtitle>
            </SectionHeader>
            
            <PostGrid>
                {postData.map((post, index) => (
                    <PostCard key={post.slug.current} $index={index}>
                        <PostLink to={`/post/${post.slug.current}`}>
                            <PostImageContainer>
                                {post.mainImage ? (
                                    <PostImage 
                                        src={post.mainImage.asset.url} 
                                        alt={post.mainImage.alt || post.title}
                                        loading="lazy"
                                    />
                                ) : (
                                    <PlaceholderImage>
                                        <PlaceholderIcon>📄</PlaceholderIcon>
                                    </PlaceholderImage>
                                )}
                                <PostOverlay>
                                    <ReadMoreButton>
                                        <span>Read Article</span>
                                        <FiArrowRight />
                                    </ReadMoreButton>
                                </PostOverlay>
                            </PostImageContainer>
                            
                            <PostContent>
                                <PostMeta>
                                    <MetaItem>
                                        <FiCalendar size={14} />
                                        <span>
                                            {new Date(post.displayDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </MetaItem>
                                    <MetaItem>
                                        <FiClock size={14} />
                                        <span>{post.estimatedReadingTime} min read</span>
                                    </MetaItem>
                                </PostMeta>
                                
                                <PostTitle>{post.title}</PostTitle>
                                
                                {post.excerpt && (
                                    <PostExcerpt>{post.excerpt}</PostExcerpt>
                                )}
                                
                                <ReadMoreLink>
                                    <span>Continue Reading</span>
                                    <FiArrowRight />
                                </ReadMoreLink>
                            </PostContent>
                        </PostLink>
                    </PostCard>
                ))}
            </PostGrid>
        </PostContainer>
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

const shimmer = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
`;

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
`;

// Styled Components
const PostContainer = styled.div`
    width: 100%;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;

const LoadingSpinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid rgba(102, 126, 234, 0.1);
    border-top: 4px solid #667eea;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
`;

const EmptyIcon = styled.div`
    font-size: 4rem;
    margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
`;

const EmptyMessage = styled.p`
    font-size: 1rem;
    line-height: 1.6;
`;

const SectionHeader = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        margin-bottom: 2rem;
    }
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const SectionSubtitle = styled.p`
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
`;

const PostGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const PostCard = styled.article`
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(0, 0, 0, 0.05);
    animation: ${fadeInUp} 0.6s ease-out ${props => props.$index * 0.1}s both;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
`;

const PostLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: inherit;
    height: 100%;
`;

const PostImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
`;

const PostImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    ${PostCard}:hover & {
        transform: scale(1.05);
    }
`;

const PlaceholderImage = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: ${shimmer} 2s infinite;
    }
`;

const PlaceholderIcon = styled.div`
    font-size: 3rem;
    opacity: 0.8;
`;

const PostOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    
    ${PostCard}:hover & {
        opacity: 1;
    }
`;

const ReadMoreButton = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    color: #667eea;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    font-size: 0.9rem;
    transform: translateY(10px);
    transition: transform 0.3s ease;
    
    ${PostCard}:hover & {
        transform: translateY(0);
    }
    
    svg {
        transition: transform 0.3s ease;
    }
    
    &:hover svg {
        transform: translateX(3px);
    }
`;

const PostContent = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: calc(100% - 220px);
`;

const PostMeta = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #6b7280;
    font-size: 0.85rem;
    
    svg {
        color: #667eea;
    }
`;

const PostTitle = styled.h3`
    font-size: 1.4rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
`;

const PostExcerpt = styled.p`
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.95rem;
`;

const ReadMoreLink = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: auto;
    transition: all 0.3s ease;
    
    svg {
        transition: transform 0.3s ease;
    }
    
    ${PostCard}:hover & {
        color: #5a67d8;
        
        svg {
            transform: translateX(3px);
        }
    }
`;