import React from 'react';
import { shallow } from 'enzyme';
import ImageSelector from '../../src/components/ImageSelector';
import Thumbnail from '../../src/components/Thumbnail';
import { testImages, firstImage } from '../__fixtures__/'

const props = {
	addToCarousel: jest.fn(),
	allImages: testImages,
	selectedImages: [],
}

describe('ImageSelector component', () => {
	it('returns an <img /> for every item in the carousel', () => {
		const component = shallow(<ImageSelector {...props} />);
		expect(component.find(Thumbnail).length).toEqual(testImages.length);
	});
	it('adds selectedImages to state with selectImage', () => {
    const component = shallow(<ImageSelector {...props} />);
    const selectImage = component.instance().selectImage;

    selectImage(firstImage);

    expect(component.state()).toEqual({
      selectedImages: [{
        "imageCaption": "Letter Board",
        "imageName": "letterBoardIc.jpg",
        "src": "http://www.testurl.com",
      }],
    });
  });
  it('removes selectedImages from state with deselectImage', () => {
    const component = shallow(<ImageSelector {...props} />);
    const deselectImage = component.instance().deselectImage;

    component.setState({ selectedImages: [firstImage] });
    deselectImage(firstImage);

    expect(component.state()).toEqual({ selectedImages: [] });
  });
	it('adds an array of images to the carousel when the "add" button is clicked', () => {
		const component = shallow(<ImageSelector {...props} />);
		const selectImage = component.instance().selectImage;

		selectImage(firstImage);
		selectImage(testImages[1]);

		const addButton = component.find('[data-testid="addButton"]');
		addButton.simulate('click');

		expect(props.addToCarousel).toHaveBeenCalledWith([
			firstImage,
			testImages[1],
		]);
	});
	it('clears selectedImages out of state after adding to carousel', () => {
		const component = shallow(<ImageSelector {...props} />);
		const selectImage = component.instance().selectImage;

		selectImage(firstImage);
		selectImage(testImages[1]);

		expect(component.state()).toEqual({
			selectedImages: [
				firstImage,
				testImages[1],
			],
		});

		const addButton = component.find('[data-testid="addButton"]');
		addButton.simulate('click');

		expect(component.state()).toEqual({
			selectedImages: [],
		});
	});
	it('filters images out of the ImageSelector options after they are added to Carousel', () => {
		const component = shallow(<ImageSelector {...props} />);
		const selectImage = component.instance().selectImage;

		expect(component.find(Thumbnail).length).toEqual(testImages.length);

		component.setProps({
			carouselImages: [firstImage, testImages[1]],
		});

		expect(component.find(Thumbnail).length).toEqual(testImages.length - 2);
	});
});
