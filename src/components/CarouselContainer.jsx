import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageSelector from './ImageSelector';
import ImageViewer from './ImageViewer';
import Carousel from './Carousel';

export default class CarouselContainer extends Component {
  state = {
    carouselImages: [],
  }

  addToCarousel = (imageArray) => {
    const carouselImages = [...this.state.carouselImages, ...imageArray];

    this.setState({ carouselImages });
  };

  render() {
    return (
      <div>
        <Carousel images={this.state.carouselImages} />
        <ImageSelector addToCarousel={this.addToCarousel} images={this.props.images} />
        <ImageViewer />
      </div>
    );
  };
}

CarouselContainer.displayName = 'CarouselContainer';

CarouselContainer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};
