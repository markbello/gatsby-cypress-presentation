import React from 'react';
import { shallow } from 'enzyme';
import CarouselContainer from '../../src/components/CarouselContainer';
import { testImages, firstImage } from '../__fixtures__/';

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
  it('removeFromCarousel removes images from state', () => {
		const component = shallow(<CarouselContainer images={testImages} />);
		component.setState({ carouselImages: [firstImage, testImages[1]] });

		expect(component.state().carouselImages.length).toEqual(2);

		const removeFromCarousel = component.instance().removeFromCarousel;
		removeFromCarousel([testImages[1]]);

		expect(component.state().carouselImages.length).toEqual(1);
  });
  it('activateImage sets activeImage on the state', () => {
    const component = shallow(<CarouselContainer images={testImages} />);
    const { activateImage } = component.instance();

    expect(component.state().activeImage).toBe(null);

    activateImage(firstImage);

    expect(component.state().activeImage).toEqual(firstImage);
  });
  it('deactivateImage unsets activeImage on the state', () => {
    const component = shallow(<CarouselContainer images={testImages} />);
    const { deactivateImage } = component.instance();

    component.setState({ activeImage: firstImage });
    deactivateImage();

    expect(component.state().activeImage).toBe(null);
  });
});
