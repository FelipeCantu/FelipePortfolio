import React from 'react';
import styled from "styled-components";
import Post from './Post'
import { Helmet } from 'react-helmet-async'

function Blog() {
  return (
   <>
    <Helmet>
      <title>Blogs</title>
      <meta name="description" content="Continue reading the most recent daily blog updates." />
      <link rel="canonical" href="/Blog" />
    </Helmet>
     <Body>
         <Post />
    </Body>
   </>
  );
}

const Body = styled.div`
overflow: auto;
height: 100vh;
  div {
    margin-top: 50px;
    // background: #5A5A5A;
  }
`

export default Blog;