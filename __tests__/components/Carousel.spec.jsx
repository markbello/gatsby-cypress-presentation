import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../src/components/Carousel';
import CarouselImage from '../../src/components/CarouselImage';
import { carouselImages } from '../../src/images/carouselImages.json';

const testImages = carouselImages.map(imageData => ({
	...imageData,
	src: 'http://www.testurl.com',
}));

const removeFromCarousel = jest.fn();

const props = {
  images: testImages,
  removeFromCarousel,
};

const firstImage = testImages[0];

describe('Carousel component', () => {
  it('only shows one row of images at a time', () => {
    const component = shallow(<Carousel {...props} />);

    expect(component.find(CarouselImage).length).toEqual(2);
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
  it('toggleEditMode sets isEditMode on state', () => {
    const component = shallow(<Carousel {...props} />);
    const { toggleEditMode } = component.instance();

    expect(component.state().isEditMode).toBe(false);

    toggleEditMode();

    expect(component.state().isEditMode).toBe(true);
  });
  it('adds selectedImages to state with selectImage', () => {
    const component = shallow(<Carousel {...props} />);
    const selectImage = component.instance().selectImage;

    selectImage(firstImage);

    expect(component.state().selectedImages).toEqual([
      {
        "imageCaption": "Letter Board",
        "imageName": "letterBoardIc.jpg",
        "src": "http://www.testurl.com",
      },
    ]);
  });
  it('removes selectedImages from state with deselectImage', () => {
    const component = shallow(<Carousel {...props} />);
    const deselectImage = component.instance().deselectImage;

    component.setState({ selectedImages: [firstImage] });
    deselectImage(firstImage);

    expect(component.state().selectedImages).toEqual([]);
  });
  it('removes an array of images from the carousel when the "remove" button is clicked', () => {
    const component = shallow(<Carousel {...props} />);
    const selectImage = component.instance().selectImage;

    selectImage(firstImage);
    selectImage(testImages[1]);

    const removeButton = component.find('[data-testid="button-remove"]');
    removeButton.simulate('click');

    expect(props.removeFromCarousel).toHaveBeenCalledWith([
      firstImage,
      testImages[1],
    ]);
  });
  it('clears selectedImages out of state after removing from carousel', () => {
    const component = shallow(<Carousel {...props} />);
    const selectImage = component.instance().selectImage;

    selectImage(firstImage);
    selectImage(testImages[1]);

    expect(component.state().selectedImages).toEqual([
      firstImage,
      testImages[1],
    ]);

    const removeButton = component.find('[data-testid="button-remove"]');
    removeButton.simulate('click');

    expect(component.state().selectedImages).toEqual([]);
  });
});
