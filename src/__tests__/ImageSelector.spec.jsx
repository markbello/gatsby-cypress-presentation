import React from 'react';
import { shallow } from 'enzyme';
import ImageSelector from '../components/ImageSelector';
import { carouselImages } from '../components/carouselImages.json';

const testImages = carouselImages.map(imageData => ({
	...imageData,
	src: 'http://www.testurl.com',
}));

describe('ImageSelector component', () => {
	it('returns an <img /> for every item in the carousel', () => {
		const component = shallow(<ImageSelector images={testImages} />);
		expect(component.find('img').length).toEqual(carouselImages.length);
	});
});
