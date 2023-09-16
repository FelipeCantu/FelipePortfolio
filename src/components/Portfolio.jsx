import React from 'react';
import Project from './Project';
import styled from 'styled-components';

function Portfolio() {
  return (
    <Port>
      <div>
        <h2>Projects</h2>
          <Project />
      </div>
    </Port>
  );
}

const Port = styled.div `
  margin-top: 100px;
`

export default Portfolio;