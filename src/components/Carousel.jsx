import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pull } from 'lodash';
import lang from '../core/langPack.json';
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
    const startIndex = this.calculateNextStartIndex();
    this.setState({ startIndex });
  }

  previousButtonHandler = () => {
    const { rowLimit, startIndex } = this.state;
    const basicPreviousStartIndex = startIndex - rowLimit;

    const sanitizedPreviousStartIndex = Math.max(basicPreviousStartIndex, 0);
    this.setState({ startIndex: sanitizedPreviousStartIndex });
  }

  setRowLimit = ({ target: { value } }) => {
    const rowLimit = parseInt(value);
    this.setState({ rowLimit });
  };

  toggleEditMode = () => {
    const { deactivateImage } = this.props;
    const isEditMode = !this.state.isEditMode;

    deactivateImage();
    this.setState({ isEditMode, selectedImages: [] });
  }

  calculateNextStartIndex = () => {
    const { rowLimit, startIndex } = this.state;
    const { images } = this.props;

    const ordinaryNextIndex = rowLimit + startIndex;
    const isFinalRow = (ordinaryNextIndex + rowLimit) > images.length;
    const emptySlotCount = images.length - ordinaryNextIndex;

    const shouldShiftIndex = isFinalRow
      && emptySlotCount > 0;

    return shouldShiftIndex
      ? ordinaryNextIndex - emptySlotCount
      : ordinaryNextIndex;
  }

  render() {
    const {
      activateImage,
      deactivateImage,
      images,
      removeFromCarousel,
    } = this.props;
    const {
      isEditMode,
      rowLimit,
      selectedImages,
      startIndex,
    } = this.state;
    const {
      viewModeLabel,
      editModeLabel,
      removeButtonLabel,
      previousButtonLabel,
      nextButtonLabel,
      rowLimitLabel,
    } = lang;

    const imagesToShow = images.slice(startIndex, (startIndex + rowLimit));

    const shouldDisableNextButton = (startIndex + rowLimit) >= images.length;
    const shouldDisableRemoveButton = !isEditMode
      || !selectedImages.length;

    const viewModeButtonLabel = isEditMode
      ? viewModeLabel
      : editModeLabel;

    return (
      <div data-testid="carousel">
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}>
          {imagesToShow.map(image => (
            <CarouselImage
              activateImage={activateImage}
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
              {previousButtonLabel}
            </button>
            <button
              data-testid="button-next"
              disabled={shouldDisableNextButton}
              onClick={this.nextButtonHandler}
            >
              {nextButtonLabel}
            </button>
            <div>
              <label htmlFor="row-limit">{rowLimitLabel}</label>
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
                {removeButtonLabel}
              </button>
            </div>
          </div>
      )}
    </div>
    );
  }
};

Carousel.propTypes = {
  activateImage: PropTypes.func.isRequired,
  deactivateImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
  removeFromCarousel: PropTypes.func.isRequired,
  rowLimit: PropTypes.number.isRequired,
};

Carousel.displayName = 'Carousel';

export default Carousel;
