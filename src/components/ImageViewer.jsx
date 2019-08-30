import React from 'react';
import PropTypes from 'prop-types';
import './imageViewer.css';

const ImageViewer = ({ image: { imageCaption, src } }) => (
  <div data-testid="image-viewer">
    <img
      className="imageViewerImage"
      data-testid="image-viewer-img"
      src={src}
    />
    <div data-testid="image-viewer-caption">{imageCaption}</div>
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
