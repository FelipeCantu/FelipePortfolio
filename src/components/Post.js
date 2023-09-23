import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../sanityClient";
import styled from "styled-components";

export default function Post() {
    const [postData, setPost] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "post"]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                }
            }`
            )
            .then((data) => setPost(data))
            .catch(console.error);
    }, []);

    if (!postData) return <div>Loading...</div>;

    return (
        <Main>
            <main>
                <Section>
                    <PostContainer>
                        {postData &&
                            postData.map((post, index) => (
                                <PostCard key={index}>
                                    <PostLink to={"/post/" + post.slug.current} key={post.slug.current}>
                                        <PostImage>
                                            <img src={post.mainImage.asset.url} alt={post.mainImage.alt} />
                                        </PostImage>
                                        <PostContent>
                                            <h3>{post.title}</h3>
                                        </PostContent>
                                    </PostLink>
                                </PostCard>
                            ))}
                    </PostContainer>
                </Section>
            </main>
        </Main>
    );
}

const Main = styled.div`
  overflow: auto;
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

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  max-width: 70%;
  margin: 0 auto;
`;

const PostCard = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const PostImage = styled.div`
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    .post-content {
      transform: translateY(0);
    }
  }
`;

const PostContent = styled.div`
  padding: 16px;
  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
`;
