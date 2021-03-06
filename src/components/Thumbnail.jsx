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
      className={`thumbnail ${ isSelected ? 'selected' : null }`}
      data-testid="thumbnail"
      onClick={clickHandler}>
      <img
        alt={imageCaption}
        src={src}
        width="100px"
      />
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
