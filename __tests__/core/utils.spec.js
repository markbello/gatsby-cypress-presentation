import {
  sanitizeCaption,
  sortImagesByCaption,
} from '../../src/core/utils';

describe('utils', () => {
  it('sortImagesByCaption sorts images by imageCaption', () => {
    const imageArray = [
      {
        imageName: 'A',
        imageCaption: 'Z',
        src: '#',
      },
      {
        imageName: 'C',
        imageCaption: 'X',
        src: '#',
      },
      {
        imageName: 'B',
        imageCaption: 'Y',
        src: '#',
      },
    ];

    expect(sortImagesByCaption(imageArray)).toEqual([
      {
        imageName: 'C',
        imageCaption: 'X',
        src: '#',
      },
      {
        imageName: 'B',
        imageCaption: 'Y',
        src: '#',
      },
      {
        imageName: 'A',
        imageCaption: 'Z',
        src: '#',
      },
    ]);
  });
  it('sanitizeCaption trims and UpperCases', () => {
    const testInput = ' ClEan';

    expect(sanitizeCaption(testInput)).toBe('CLEAN');
  });
});
