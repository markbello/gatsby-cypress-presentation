import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { difference, uniq } from 'lodash';
import { sortImagesByCaption } from '../utils';
import ImageSelector from './ImageSelector';
import ImageViewer from './ImageViewer';
import Carousel from './Carousel';

export default class CarouselContainer extends Component {
  state = {
    carouselImages: [],
    rowLimit: 5,
  }

  addToCarousel = (imageArray) => {
    const sortedImages = sortImagesByCaption([...this.state.carouselImages, ...imageArray]);
    const carouselImages = uniq(sortedImages);

    this.setState({ carouselImages });
  };

  removeFromCarousel = (imageArray) => {
    const carouselImages = difference(this.state.carouselImages, imageArray);
    this.setState({ carouselImages });
  };

  render() {
    return (
      <div>
        <Carousel
          images={this.state.carouselImages}
          removeFromCarousel={this.removeFromCarousel}
          rowLimit={this.state.rowLimit}
        />
        <ImageSelector
          addToCarousel={this.addToCarousel}
          allImages={this.props.allImages}
          carouselImages={this.state.carouselImages}
        />
        <ImageViewer />
      </div>
    );
  };
}

CarouselContainer.displayName = 'CarouselContainer';

CarouselContainer.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};
