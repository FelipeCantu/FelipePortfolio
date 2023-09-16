import React from 'react';
import styled from "styled-components";
import Post from './Post'

function Blog() {
  return (
    <Body>
      <div>
        <h2>Blogs</h2>
         <Post />
      </div>
    </Body>
  );
}

const Body = styled.div`
  div {
    position: relative;
    margin-top: 60px;
  }
`

export default Blog;