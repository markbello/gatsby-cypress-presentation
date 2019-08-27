import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { difference, pull } from 'lodash';
import './imageSelector.css';
import Thumbnail from './Thumbnail';

class ImageSelector extends Component {
	state = {
		selectedImages: [],
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

	addButtonHandler = () => {
		const { addToCarousel } = this.props;
		const imagesToAdd = this.state.selectedImages;

		addToCarousel(imagesToAdd);
		this.setState({ selectedImages: [] });
	}

	render() {
		const { allImages, carouselImages } = this.props;
		const { selectedImages } = this.state;

		const availableImages = difference(allImages, carouselImages);

		return (
			<div>
				<div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{availableImages.map(image => {
						const isSelected = selectedImages.includes(image);

						const clickHandler = () => isSelected
							? this.deselectImage(image)
							: this.selectImage(image);

						return (
							<Thumbnail
								clickHandler={clickHandler}
								key={image.imageName}
								imageCaption={image.imageCaption}
								isSelected={isSelected}
								src={image.src}
							/>
						);
					})}
				</div>
				<div>
					<button data-testid="addButton" disabled={selectedImages.length === 0} onClick={this.addButtonHandler}>Add</button>
				</div>
			</div>
		);
	};
}

ImageSelector.propTypes = {
	addToCarousel: PropTypes.func.isRequired,
	carouselImages: PropTypes.arrayOf(PropTypes.shape({
		imageCaption: PropTypes.string.isRequired,
		imageName: PropTypes.string.isRequired,
		src: PropTypes.string.isRequired,
	})),
	images: PropTypes.arrayOf(PropTypes.shape({
		imageCaption: PropTypes.string.isRequired,
		imageName: PropTypes.string.isRequired,
		src: PropTypes.string.isRequired,
	})),
};

ImageSelector.displayName = 'ImageSelector';

export default ImageSelector;
