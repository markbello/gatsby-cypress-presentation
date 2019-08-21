import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { sortImagesByCaption } from '../utils';
import { carouselImages } from '../components/carouselImages.json';
import Layout from '../components/Layout';
import Carousel from '../components/Carousel';
import ImageSelector from '../components/ImageSelector';
import ImageViewer from '../components/ImageViewer';

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

  const imagesWithSrc = carouselImages.map((image, idx) => {
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
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <ImageSelector images={sortedImages} />
        <Carousel />
        <ImageViewer />
      </div>
    </Layout>
  );
};

export default IndexPage;
