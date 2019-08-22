import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pull } from 'lodash';
import ImageSelector from './ImageSelector';
import ImageViewer from './ImageViewer';
import Carousel from './Carousel';

export default class CarouselContainer extends Component {
  state = {
    selectedImages: [],
  };

  selectImage = (image) => {
    this.setState({
      selectedImages: [...this.state.selectedImages, image],
    });
  }

  deselectImage = (image) => {
    const selectedImages = pull(this.state.selectedImages, image);
    this.setState({ selectedImages });
  }

  render() {
    return (
      <div>
        <ImageSelector images={this.props.images} />
        <ImageViewer />
        <Carousel />
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
