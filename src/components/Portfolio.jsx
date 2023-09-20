import React from 'react';
import Project from './Project';
import styled from 'styled-components';

function Portfolio() {
  return (
    <Port>
      <div>
          <Project />
      </div>
    </Port>
  );
}

const Port = styled.div `
  margin-top: 60px;

`

export default Portfolio;