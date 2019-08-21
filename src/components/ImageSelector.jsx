import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { carouselImages } from './carouselImages.json';

const ImageSelector = ({ images }) => {
	return (
		<div>{images.map(image => (
			<img
				src={image.src}
				key={image.imageName}
				alt={image.imageCaption}
			/>
		))}
		</div>
	);
};

ImageSelector.propTypes = {};

ImageSelector.displayName = 'ImageSelector';

export default ImageSelector;
