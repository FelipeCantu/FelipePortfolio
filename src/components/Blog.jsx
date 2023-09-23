import React from 'react';
import styled from "styled-components";
import Post from './Post'

function Blog() {
  return (
    <Body>
         <Post />
    </Body>
  );
}

const Body = styled.div`
overflow: auto;
height: 100vh;
  div {
    margin-top: 60px;
    // background: #5A5A5A;
  }
`

export default Blog;