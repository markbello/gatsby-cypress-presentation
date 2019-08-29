import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './carouselImage.css';

const CarouselImage = ({
  activateImage,
  deselectImage,
  image,
  isEditMode,
  isSelected,
  rowLimit,
  selectImage,
}) => {
  const { imageCaption, imageName, src } = image;
  const [isCaptionVisible, setIsCaptionVisible] = useState(false);
  const toggleCaption = () => setIsCaptionVisible(!isCaptionVisible);

  const shouldShowCaption = !isEditMode
    && isCaptionVisible;

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
      style={{ width: `calc(${100 / rowLimit}% - 10px)`, margin: '5px' }}
      onClick={imageClickHandler}
      onMouseEnter={toggleCaption}
      onMouseLeave={toggleCaption}
    >
      <img src={src} alt={imageCaption} style={{ borderRadius: '15px' }}/>
      {shouldShowCaption && (
        <div data-testid="carousel-image-caption" className="imageCaption">
          {imageCaption}
        </div>
      )}
    </div>
  );
};

CarouselImage.propTypes = {
  image: PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
  isEditMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  rowLimit: PropTypes.number.isRequired,
};

CarouselImage.displayName = 'CarouselImage';

export default CarouselImage;
