import React from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images }) => {
  console.log({
    carousel: images,
  });
  return (
    <h1>Carousel {images.map(image => image.imageName)}</h1>
  );
};

Carousel.propTypes = {};

Carousel.displayName = 'Carousel';

export default Carousel;
