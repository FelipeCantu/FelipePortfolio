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

    return (
        <Posts>
            <main>
                <section>
                    <div>
                        {postData &&
                            postData.map((post, index) => (
                                <article>
                                    <Link to={"/post/" + post.slug.current} key={post.slug.current}>
                                        <span
                                            key={index}
                                        >
                                            <img
                                                src={post.mainImage.asset.url}
                                                alt={post.mainImage.alt}
                                            />
                                            <span>
                                                <h3>
                                                    {post.title}
                                                </h3>
                                            </span>
                                        </span>
                                    </Link>
                                </article>
                            ))}
                    </div>
                </section>
            </main>
        </Posts>
    );
}

const Posts = styled.div`
  width: 70%;
  margin: auto;
  height: 100vh;
  img {
    width: 100px;
    height: 100px;
  }
`