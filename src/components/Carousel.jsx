import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pull } from 'lodash';
import CarouselImage from './CarouselImage';

class Carousel extends Component {
  state = {
    isEditMode: false,
    rowLimit: 2,
    selectedImages: [],
    startIndex: 0,
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

  removeButtonHandler = () => {
    const { removeFromCarousel } = this.props;
    const imagesToRemove = this.state.selectedImages;

    removeFromCarousel(imagesToRemove);
    this.setState({ selectedImages: [] });
  }

  nextButtonHandler = () => {
    const { rowLimit, startIndex } = this.state;
    this.setState({ startIndex: startIndex + rowLimit });
  }

  previousButtonHandler = () => {
    const { rowLimit, startIndex } = this.state;
    this.setState({ startIndex: startIndex - rowLimit });
  }

  setRowLimit = ({ target: { value: rowLimit } }) => {
    this.setState({ rowLimit });
  };

  toggleEditMode = () => {
    const isEditMode = !this.state.isEditMode;
    this.setState({ isEditMode });
  }

  render() {
    const { images, removeFromCarousel } = this.props;
    const {
      isEditMode,
      rowLimit,
      selectedImages,
      startIndex,
    } = this.state;

    const imagesToShow = images.slice(startIndex, (startIndex + rowLimit));

    const shouldDisableNextButton = (startIndex + rowLimit) >= images.length;
    const shouldDisableRemoveButton = !isEditMode
      || !selectedImages.length;

    const viewModeButtonLabel = isEditMode
      ? 'Return to View Mode'
      : 'Enter Edit Mode';

    return (
      <div data-testid="carousel">
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}>
          {imagesToShow.map(image => (
            <CarouselImage
              deselectImage={this.deselectImage}
              image={image}
              isEditMode={isEditMode}
              isSelected={selectedImages.includes(image)}
              key={image.imageName}
              rowLimit={rowLimit}
              selectImage={this.selectImage}
            />
          ))}
        </div>
        {!!images.length && (
          <div>
            <button
              data-testid="button-previous"
              disabled={startIndex === 0}
              onClick={this.previousButtonHandler}
              >
              previous
            </button>
            <button
              data-testid="button-next"
              disabled={shouldDisableNextButton}
              onClick={this.nextButtonHandler}
              >
              next
            </button>
            <div>
              <label htmlFor="row-limit">Row Limit</label>
              <select
                data-testid="dropdown-rowlimit"
                name="row-limit"
                onChange={this.setRowLimit}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <button
                data-testid="button-view-mode"
                onClick={this.toggleEditMode}
              >
                {viewModeButtonLabel}
              </button>
            </div>
            <div>
              <button
                data-testid="button-remove"
                disabled={shouldDisableRemoveButton}
                onClick={this.removeButtonHandler}
              >
                Remove from Carousel
              </button>
            </div>
          </div>
      )}
    </div>
    );
  }
};

Carousel.propTypes = {
  images: PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  removeFromCarousel: PropTypes.func.isRequired,
};

Carousel.displayName = 'Carousel';

export default Carousel;
