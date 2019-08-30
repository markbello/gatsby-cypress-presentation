import React from 'react';
import PropTypes from 'prop-types';
import './thumbnail.css';

const Thumbnail = ({
  clickHandler,
  imageCaption,
  isSelected,
  src,
}) => {
  return (
    <div
      className={`${ isSelected ? 'selected' : null }`}
      data-testid="thumbnail"
      style={{ width: '100px', margin: '5px' }}
      onClick={clickHandler}>
      <img
        alt={imageCaption}
        src={src}
        style={{ borderRadius: '15px' }}
        width="100px"
      />
      <p>{imageCaption}</p>
    </div>
  );
};

Thumbnail.displayName = 'Thumbnail';

Thumbnail.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  imageCaption: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

export default Thumbnail;
