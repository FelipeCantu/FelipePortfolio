import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import styled from "styled-components";

export default function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
          title,
          date,
          place,
          description,
          projectType,
          link,
          tags,
          image { 
            asset -> {
              _id,
              url 
            }
          }
      }`
      )
      .then((data) => setProjectData(data))
      .catch(console.error);
  }, []);
  if (!projectData) return <div>Loading...</div>;

  return (
    <Main>
      <main>
        <Section>
          <CardContainer>
            {projectData &&
              projectData.map((project, index) => (
                <Card key={index}>
                  <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                    <ProjectImage>
                      {project.image && (
                        <img src={project.image.asset.url} alt={project.title} />
                      )}
                    </ProjectImage>
                    <CardContent>
                      <h3>{project.title}</h3>
                      <div>
                        <span>
                          <strong>Finished on</strong>:{" "}
                          {new Date(project.date).toLocaleDateString()}
                        </span>
                        <span>
                          <strong>Technologies</strong>: {project.place}
                        </span>
                        <span>
                          <strong>Type</strong>: {project.projectType}
                        </span>
                        <p>{project.description}</p>
                      </div>
                    </CardContent>
                  </ProjectLink>
                </Card>
              ))}
          </CardContainer>
        </Section>
      </main>
    </Main>
  );
}

const Main = styled.div`
  overflow: auto;
  height: 100vh;
  h1 {
    color: white;
    text-decoration: underline;
    font-size: 40px;
  }
`;

const Section = styled.div`
  padding: 20px 0;
  padding-bottom: 100px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 70%;
  margin: auto;
`;

const Card = styled.article`
  margin: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectLink = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    .card-content {
      transform: translateY(0);
    }
  }
`;

const CardContent = styled.div`
  padding: 16px;

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  p {
    margin-top: 8px;
    font-size: 1rem;
    color: #555;
  }
`;
