import { carouselImages } from '../../src/images/carouselImages.json';

export const testImages = carouselImages.map((imageData) => ({
  ...imageData,
  src: 'http://www.testurl.com',
}));

export const firstImage = testImages[0];
