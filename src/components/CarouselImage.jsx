import React from 'react';
import PropTypes from 'prop-types';
import ReactHoverObserver from 'react-hover-observer';
import './carouselImage.css';

const CarouselImage = ({
  activateImage,
  deselectImage,
  image,
  isEditMode,
  isHovering,
  isSelected,
  rowLimit,
  selectImage,
}) => {
  const { imageCaption, imageName, src } = image;

  const imageClickHandler = ({ target: { value } }) => {
    if (isEditMode) {
      return isSelected
        ? deselectImage(image)
        : selectImage(image);
    }

    return activateImage(image);
  };

  return (
    <div
      data-testid="carousel-image"
      className={`imageContainer ${isSelected && "selected"}`}
      onClick={imageClickHandler}
      style={{ width: `calc(${100 / rowLimit}% - 10px)`, margin: '5px' }}
      >
      <ReactHoverObserver>
        {({ isHovering }) => (
          <div>
            <img
              alt={imageCaption}
              className="animation-target carouselImage"
              src={src}
              />
            {isHovering && (
              <div data-testid="carousel-image-caption" className="imageCaption">
                {imageCaption}
              </div>
            )}
          </div>
        )}
      </ReactHoverObserver>
    </div>
  );
};

CarouselImage.propTypes = {
  activateImage: PropTypes.func.isRequired,
  deselectImage: PropTypes.func.isRequired,
  image: PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  isEditMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  rowLimit: PropTypes.number.isRequired,
  selectImage: PropTypes.func.isRequired,
};

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
