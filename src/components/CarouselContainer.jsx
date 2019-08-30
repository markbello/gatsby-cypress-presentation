import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { difference, uniq } from 'lodash';
import { sortImagesByCaption } from '../core/utils';
import ImageSelector from './ImageSelector';
import ImageViewer from './ImageViewer';
import Carousel from './Carousel';

class CarouselContainer extends Component {
  state = {
    activeImage: null,
    carouselImages: [],
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

  activateImage = (image) => this.setState({ activeImage: image });
  deactivateImage = () => this.setState({ activeImage: null });

  render() {
    const { allImages } = this.props;
    const { activeImage, carouselImages, rowLimit } = this.state;

    return (
      <div>
        <ImageSelector
          addToCarousel={this.addToCarousel}
          allImages={allImages}
          carouselImages={carouselImages}
        />
        <Carousel
          activateImage={this.activateImage}
          deactivateImage={this.deactivateImage}
          images={carouselImages}
          removeFromCarousel={this.removeFromCarousel}
        />
        {activeImage && <ImageViewer image={activeImage} />}
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

export default CarouselContainer;
