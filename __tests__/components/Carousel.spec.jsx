import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../src/components/Carousel';
import { carouselImages } from '../../src/images/carouselImages.json';

const props = {
  images: carouselImages,
};

describe('Carousel component', () => {
  it('only shows one row of images at a time', () => {
    const component = shallow(<Carousel {...props} />);

    expect(component.find('[data-testid="carousel-image"]').length).toEqual(2);
  });
  it('decrements the start index by rowLimit on "previous" button click', () => {
    const component = shallow(<Carousel {...props} />);
    const previousButton = component.find('[data-testid="button-previous"]');
    const { rowLimit, startIndex } = component.state();

    previousButton.simulate('click');

    expect(component.state().startIndex).toEqual(startIndex - rowLimit);
  });
  it('increments the start index by rowLimit on "next" button click', () => {
    const component = shallow(<Carousel {...props} />);
    const nextButton = component.find('[data-testid="button-next"]');
    const { rowLimit, startIndex } = component.state();

    nextButton.simulate('click');

    expect(component.state().startIndex).toEqual(startIndex + rowLimit);
  });
  it('changes rowLimit in state through dropdown', () => {
    const component = shallow(<Carousel {...props} />);
    const { setRowLimit } = component.instance();

    setRowLimit({ target: { value: 5 } });

    expect(component.state().rowLimit).toEqual(5)
  });
});
