import React from 'react';
import { shallow } from 'enzyme';
import CarouselContainer from '../../src/components/CarouselContainer';
import { carouselImages } from '../../src/images/carouselImages.json';

const testImages = carouselImages.map((imageData) => ({
  ...imageData,
  src: 'http://www.testurl.com',
}));
const firstImage = testImages[0];

describe('CarouselContainer', () => {
  it('addToCarousel adds images to state', () => {
		const component = shallow(<CarouselContainer images={testImages} />);
		component.setState({ carouselImages: [firstImage] });

		expect(component.state().carouselImages.length).toEqual(1);

		const newImages = [testImages[1], testImages[2]];
		const addToCarousel = component.instance().addToCarousel;
		addToCarousel(newImages);

		expect(component.state().carouselImages.length).toEqual(3);
  });
});
