import React from 'react';
import PropTypes from 'prop-types';

const ImageSelector = ({ images }) => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{images.map(image => (
			<figure style={{ width: '100px', margin: '10px' }}>
				<img
					alt={image.imageCaption}
					src={image.src}
					style={{ borderRadius: '15px' }}
					key={image.imageName}
					width="100px"
				/>
				<figcaption>{image.imageCaption}</figcaption>
			</figure>
		))}
		</div>
	);
};

ImageSelector.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({
		imageCaption: PropTypes.string.isRequired,
		imageName: PropTypes.string.isRequired,
		src: PropTypes.string.isRequired,
	})),
};

ImageSelector.displayName = 'ImageSelector';

export default ImageSelector;
