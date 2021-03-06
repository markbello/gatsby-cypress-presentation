import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { sortImagesByCaption } from '../core/utils';
import { carouselImages } from '../images/carouselImages.json';
import Layout from '../components/Layout';
import CarouselContainer from '../components/CarouselContainer';

const IndexPage = () => {
  const { allFile: { edges }} = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "jpg" } }) {
        edges {
          node {
            publicURL
            base
          }
        }
      }
    }
  `);
  const imageNodes = edges.map(({ node }) => node );

  const imagesWithSrc = carouselImages.map((image) => {
    const imageNode = imageNodes.find(node => node.base === image.imageName);
    const src = imageNode.publicURL;

    return {
      ...image,
      src,
    };
  });

  const sortedImages = sortImagesByCaption(imagesWithSrc);

  return (
    <Layout>
      <div style={{ marginBottom: `1.45rem` }}>
        <CarouselContainer allImages={sortedImages} />
      </div>
    </Layout>
  );
};

export default IndexPage;
