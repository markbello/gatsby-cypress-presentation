import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../src/components/Carousel';
import CarouselImage from '../../src/components/CarouselImage';
import { testImages, firstImage } from '../__fixtures__/';

const removeFromCarousel = jest.fn();

const props = {
  activateImage: jest.fn(),
  deactivateImage: jest.fn(),
  images: testImages,
  removeFromCarousel,
  rowLimit: 2,
};

describe('Carousel component', () => {
  it('only shows one row of images at a time', () => {
    const component = shallow(<Carousel {...props} />);

    expect(component.find(CarouselImage).length).toEqual(2);
  });
  it('decrements the start index by rowLimit on "previous" button click', () => {
    const component = shallow(<Carousel {...props} />);
    const previousButton = component.find('[data-testid="button-previous"]');

    component.setState({
      rowLimit: 2,
      startIndex: 4,
    });

    previousButton.simulate('click');

    expect(component.state().startIndex).toEqual(2);
  });
  it('decrements the start index down to a minimum of 0', () => {
    const component = shallow(<Carousel {...props} />);
    const previousButton = component.find('[data-testid="button-previous"]');

    component.setState({
      rowLimit: 5,
      startIndex: 2,
    });

    previousButton.simulate('click');

    expect(component.state().startIndex).toEqual(0);
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
    const { selectImage } = component.instance();

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
    const { deselectImage } = component.instance();

    component.setState({ selectedImages: [firstImage] });
    deselectImage(firstImage);

    expect(component.state().selectedImages).toEqual([]);
  });
  it('removes an array of images from the carousel when the "remove" button is clicked', () => {
    const component = shallow(<Carousel {...props} />);
    const { selectImage } = component.instance();

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
    const { selectImage } = component.instance();

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
  it('clears selectedImages out of state when switching back to View Mode', () => {
    const component = shallow(<Carousel {...props} />);
    const { toggleEditMode } = component.instance();

    component.setState({ selectedImages: [firstImage] });
    toggleEditMode();

    expect(component.state().selectedImages).toEqual([]);
  });
  it('deactivates the ImageViewer image when switching into Edit Mode', () => {
    const component = shallow(<Carousel {...props} />);
    const { toggleEditMode } = component.instance();

    toggleEditMode();

    expect(props.deactivateImage).toHaveBeenCalled();
  });
  it('calculateNextStartIndex paginates forward by rowLimit positions', () => {
    const fiveImageProps = {
      ...props,
      images: testImages.slice(0,5),
    }
    const component = shallow(<Carousel {...fiveImageProps } />);

    component.setState({
      rowLimit: 2,
      startIndex: 0,
    });

    const { calculateNextStartIndex } = component.instance();

    expect(calculateNextStartIndex(fiveImageProps.images)).toEqual(2);
  });
  it('calculateNextStartIndex shifts to include previous images to fill empty row slots', () => {
    const fiveImageProps = {
      ...props,
      images: testImages.slice(0,5),
    }
    const component = shallow(<Carousel {...fiveImageProps} />);

    component.setState({
      rowLimit: 3,
      startIndex: 0,
    });

    const { calculateNextStartIndex } = component.instance();

    expect(calculateNextStartIndex(fiveImageProps.images)).toEqual(1);
  });
});
