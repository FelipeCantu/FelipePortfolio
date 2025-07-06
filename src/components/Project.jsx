import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import styled, { keyframes } from "styled-components";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

export default function Project() {
  const [projectData, setProjectData] = useState(null);
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    sanityClient
      .fetch(
        `*[_type == "project" && 
        ($projectTypeFilter == "all" || projectType == $projectTypeFilter)] | order(date desc){
          title,
          date,
          place,
          description,
          projectType,
          link,
          github,
          tags,
          image { 
            asset -> {
              _id,
              url 
            }
          }
        }`,
        { projectTypeFilter }
      )
      .then((data) => {
        setProjectData(data);
        setIsLoading(false);
      })
      .catch(console.error);
  }, [projectTypeFilter]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ProjectContainer>
      <FilterContainer>
        <FilterLabel>Filter Projects:</FilterLabel>
        <FilterOptionsContainer>
          <FilterOption 
            selected={projectTypeFilter === "all"}
            onClick={() => setProjectTypeFilter("all")}
          >
            All Projects
          </FilterOption>
          <FilterOption 
            selected={projectTypeFilter === "web"}
            onClick={() => setProjectTypeFilter("web")}
          >
            Web Development
          </FilterOption>
          <FilterOption 
            selected={projectTypeFilter === "mobile"}
            onClick={() => setProjectTypeFilter("mobile")}
          >
            Mobile Apps
          </FilterOption>
          <FilterOption 
            selected={projectTypeFilter === "design"}
            onClick={() => setProjectTypeFilter("design")}
          >
            UI/UX Design
          </FilterOption>
        </FilterOptionsContainer>
      </FilterContainer>

      <ProjectGrid>
        {projectData && projectData.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImageContainer>
              {project.image && (
                <ProjectImage 
                  src={project.image.asset.url} 
                  alt={project.title} 
                  loading="lazy"
                />
              )}
              <ProjectTypeBadge type={project.projectType}>
                {project.projectType}
              </ProjectTypeBadge>
              
              {/* New slide-up overlay */}
              <ProjectOverlay>
                <OverlayContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  
                  <ProjectMeta>
                    <MetaItem>
                      <MetaLabel>Completed:</MetaLabel>
                      <MetaValue>
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </MetaValue>
                    </MetaItem>
                    <MetaItem>
                      <MetaLabel>Tech:</MetaLabel>
                      <MetaValue>{project.place}</MetaValue>
                    </MetaItem>
                  </ProjectMeta>
                  
                  {project.tags && (
                    <TagContainer>
                      {project.tags.map((tag, i) => (
                        <Tag key={i}>{tag}</Tag>
                      ))}
                    </TagContainer>
                  )}
                  
                  <IconContainer>
                    {project.github && (
                      <IconLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <GithubIcon />
                      </IconLink>
                    )}
                    {project.link && (
                      <IconLink href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon />
                      </IconLink>
                    )}
                  </IconContainer>
                </OverlayContent>
              </ProjectOverlay>
            </ProjectImageContainer>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectContainer>
  );
}

// STYLED COMPONENTS
const ProjectContainer = styled.div`
  width: 100%;
  padding: 0 20px 100px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  
  &::after {
    content: "";
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
    box-shadow: 0 4px 10px rgba(52, 152, 219, 0.2);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 3.5rem;
  gap: 1.2rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

const FilterLabel = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  font-weight: 700;
  margin: 0;
  padding-bottom: 0.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    border-radius: 2px;
  }
`;

const FilterOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const FilterOption = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ selected }) => selected ? 'rgba(52, 152, 219, 0.9)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${({ selected }) => selected ? 'white' : '#2c3e50'};
  border: 2px solid ${({ selected }) => selected ? 'transparent' : 'rgba(52, 152, 219, 0.2)'};
  box-shadow: ${({ selected }) => selected ? '0 4px 12px rgba(52, 152, 219, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    background-color: ${({ selected }) => selected ? 'rgba(52, 152, 219, 0.9)' : 'rgba(255, 255, 255, 1)'};
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.5rem;
  padding-bottom: 4rem;
  
  @media (max-width: 900px) {
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }
`;

const ProjectCard = styled.article`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  height: 400px; /* Fixed height for consistency */
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    transform: translateY(-5px);
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%; /* Covers bottom half */
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem;
  transform: translateY(100%); /* Initially hidden below */
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  ${ProjectCard}:hover & {
    transform: translateY(0); /* Slides up on hover */
  }
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.8rem;
`;

const ProjectTitle = styled.h3`
  color: white;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  color: rgba(255, 255, 255, 0.9);
`;

const MetaLabel = styled.span`
  font-weight: 600;
  color: #60a5fa;
  min-width: 80px;
  font-size: 0.85rem;
`;

const MetaValue = styled.span`
  flex: 1;
  line-height: 1.4;
  font-size: 0.85rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 0.5rem;
`;

const IconLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);

  &:hover {
    color: #60a5fa;
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ExternalLinkIcon = styled(FiExternalLink)`
  font-size: 1.2rem;
`;

const GithubIcon = styled(FaGithub)`
  font-size: 1.2rem;
`;

const ProjectTypeBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: ${({ type }) => 
    type === 'web' ? '#3498db' : 
    type === 'mobile' ? '#9b59b6' : 
    '#2ecc71'};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.4px;
  z-index: 2;
`;