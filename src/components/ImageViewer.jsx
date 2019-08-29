import React from 'react';
import PropTypes from 'prop-types';

const ImageViewer = ({ image }) => (
  <div data-testid="image-viewer">
    <img
      data-testid="image-viewer-img"
      src={image.src}
      style={{ width: '500px', borderRadius: '15px' }}
    />
    <div data-testid="image-viewer-caption">{image.imageCaption}</div>
  </div>
);

ImageViewer.propTypes = {
  image: PropTypes.shape({
    imageCaption: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }),
};

ImageViewer.displayName = 'ImageViewer';

export default ImageViewer;
