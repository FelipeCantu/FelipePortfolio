import React from 'react';
import styled from "styled-components";


function Blog() {
  return (
    <Body>
      <div>
        <h2>Blog</h2>
        <article>
          <h3>Blog Post Title</h3>
          <p>Content of the blog post goes here...</p>
        </article>
        <article>
          <h3>Another Blog Post Title</h3>
          <p>Content of another blog post goes here...</p>
        </article>
      </div>
    </Body>
  );
}

const Body = styled.div`
  div {
    background: black;
    color: white;
    position: relative;
    margin-top: 60px;
    height: 100vh;
  }
`

export default Blog;