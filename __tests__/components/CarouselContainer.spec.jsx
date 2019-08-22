import React from 'react';
import { shallow } from 'enzyme';
import CarouselContainer from '../../src/components/CarouselContainer';
import { carouselImages } from '../../src/images/carouselImages.json';

const testImages = carouselImages.map(imageData => ({
	...imageData,
	src: 'http://www.testurl.com',
}));
const firstImage = testImages[0];

describe('CarouselContainer', () => {
  it('adds selectedImages to state with selectImage', () => {
    const component = shallow(<CarouselContainer images={testImages} />);
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
    const component = shallow(<CarouselContainer images={testImages} />);
    const deselectImage = component.instance().deselectImage;

    component.setState({ selectedImages: [firstImage] });
    deselectImage(firstImage);

    expect(component.state()).toEqual({ selectedImages: [] });
  });
});
