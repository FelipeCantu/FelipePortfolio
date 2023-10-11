import React from 'react';
import Project from './Project';
import { Helmet } from 'react-helmet-async'
function Portfolio() {
  return (
     <>
     <Helmet>
      <title>Portfolio</title>
      <meta name="description" content="Here, you can explore a collection of my projects. I've utilized JavaScript to develop websites, applications, and even games, with designs created using Figma." />
      <link rel="canonical" href="/Portfolio" />
     </Helmet>
      <div>
          <Project />
      </div>
     </>
  );
}


export default Portfolio;