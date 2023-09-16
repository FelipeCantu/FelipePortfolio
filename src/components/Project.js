import React, { useEffect, useState } from "react";
import sanityClient from "../sanityClient";

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
          tags
      }`
            )
            .then((data) => setProjectData(data))
            .catch(console.error);
    }, []);

    return (
        <main>
            <section>
                <section>
                    {projectData &&
                        projectData.map((project, index) => (
                            <article>
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
            </section>
        </main>
    );
}