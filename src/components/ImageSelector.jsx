import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './imageSelector.css';

const ImageSelector = ({ images }) => {

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{images.map(image => {
			const [isSelected, setSelected] = useState(false);
			const clickHandler = () => setSelected(!isSelected);

			const classNames = `${ isSelected ? 'selected' : null }`;

			return(
				<div
					className={`${ isSelected ? 'selected' : null }`}
					data-testid='thumbnail'
					key={image.imageName}
					style={{ width: '100px', margin: '10px' }}
					onClick={clickHandler}>
					<img
						alt={image.imageCaption}
						src={image.src}
						style={{ borderRadius: '15px' }}
						width="100px"
					/>
					<p>{image.imageCaption}</p>
				</div>
			)
		})}
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
