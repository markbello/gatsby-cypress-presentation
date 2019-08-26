import React from 'react';
import { shallow } from 'enzyme';
import ImageSelector from '../../src/components/ImageSelector';
import Thumbnail from '../../src/components/Thumbnail';
import { carouselImages } from '../../src/images/carouselImages.json';

const testImages = carouselImages.map(imageData => ({
	...imageData,
	src: 'http://www.testurl.com',
}));

const props = {
	addToCarousel: jest.fn(),
	images: testImages,
	selectedImages: [],
}

const firstImage = testImages[0];

describe('ImageSelector component', () => {
	it('returns an <img /> for every item in the carousel', () => {
		const component = shallow(<ImageSelector {...props} />);
		expect(component.find(Thumbnail).length).toEqual(carouselImages.length);
	});
	it('adds selectedImages to state with selectImage', () => {
    const component = shallow(<ImageSelector images={testImages} />);
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
    const component = shallow(<ImageSelector images={testImages} />);
    const deselectImage = component.instance().deselectImage;

    component.setState({ selectedImages: [firstImage] });
    deselectImage(firstImage);

    expect(component.state()).toEqual({ selectedImages: [] });
  });
	it('adds an array of images to the carousel when the "add" button is clicked', () => {
		const component = shallow(<ImageSelector {...props} />);
		const instance = component.instance();
		const selectImage = instance.selectImage;

		selectImage(firstImage);
		selectImage(testImages[1]);

		const addButton = component.find('[data-testid="addButton"]');
		addButton.simulate('click');

		expect(props.addToCarousel).toHaveBeenCalledWith([
			firstImage,
			testImages[1],
		]);
	});
});
