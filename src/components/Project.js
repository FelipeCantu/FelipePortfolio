import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";
import styled from 'styled-components'

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

    return (
        <Main>
            <main>
                <Section>
                    <h1>Projects</h1>
                    <section>
                        {projectData &&
                            projectData.map((project, index) => (
                                <article key={index}>
                                    <ProjectImage>
                                        {project.image && (
                                            <img src={project.image.asset.url} alt={project.title} />
                                        )}
                                    </ProjectImage>
                                    <h3>
                                        <a
                                            href={project.link}
                                            alt={project.title}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.title}
                                        </a>
                                    </h3>
                                    <div>
                                        <span>
                                            <strong>Finished on</strong>:{" "}
                                            {new Date(project.date).toLocaleDateString()}
                                        </span>
                                        <span>
                                            <strong>Technologies</strong>:{" "}
                                            {project.place}
                                        </span>
                                        <span>
                                            <strong>Type</strong>:{" "}
                                            {project.projectType}
                                        </span>
                                        <p>
                                            {project.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                    </section>
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
`

const Section = styled.div`
    background: #c6c6c6;
    padding: 20px 0;
    section {
        padding-bottom: 100px;
        article {
            margin: 100px;
            a {
                color: white;
                font-size: 25px;
                text-decoration: none;
            }
            a:hover {
                color: #0077b5;
            }
        }
    }
`
const ProjectImage = styled.div`
    width: 100%;
    height: 200px;
    `