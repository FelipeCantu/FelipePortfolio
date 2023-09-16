import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import styled from "styled-components";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    image: ({ node }) => (
      <ImageContainer>
        <img
          src={urlFor(node.asset).url()}
          alt={node.alt}
          className="block-content-image"
        />
        {node.caption && <p className="block-content-caption">{node.caption}</p>}
      </ImageContainer>
    ),
  },
};

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
          title,
          _id,
          slug,
          publishedAt,
          mainImage{
              asset->{
                  _id,
                  url
              }
          },
          body,
          "name": author->name,
          "authorImage": author->image
      }`
      )
      .then((data) => setSinglePost(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singlePost) return <div>Loading...</div>;

  return (
    <Single>
      <main>
        <article>
          <header>
            <div>
              <div>
                <div>
                  <AuthorCard>
                    <img
                      src={urlFor(singlePost.authorImage).url()}
                      alt={singlePost.name}
                    />
                    <p>{singlePost.name}</p>
                    <p>{new Date(singlePost.publishedAt).toLocaleDateString()}</p>
                  </AuthorCard>
                </div>
                <h1>{singlePost.title}</h1>
              </div>
            </div>
            <img src={singlePost.mainImage.asset.url} alt={singlePost.title} />
          </header>
          <div>
            <BlockContent
              blocks={singlePost.body}
              projectId="r99w5jgb"
              dataset="production"
              serializers={serializers} // Use the custom serializers for image handling
            />
          </div>
        </article>
      </main>
    </Single>
  );
}

const Single = styled.div`
  position: relative;
  margin: auto;
  padding-bottom: 100px;
  width: 70%;
  h1 {
    font-size: 40px;
  }
  @media (max-width: 768px) {
    img {
      width: 100%;
    }
  }
`;

const AuthorCard = styled.div`
  display: flex;
  background: #ccc;
  padding: 15px;
  p {
    padding-right: 20px;
  }
  img {
    width: 35px;
    margin-right: 10px;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  img.block-content-image {
    max-width: 100%;
  }
  p.block-content-caption {
    font-size: 14px;
    color: #777;
  }
`;
