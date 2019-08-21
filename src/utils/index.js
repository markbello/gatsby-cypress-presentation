export const sanitizeCaption = (caption) => caption.trim().toUpperCase();

export const sortImagesByCaption = (imageArray) => imageArray
  .sort((a, b) => {
    const captionA = sanitizeCaption(a.imageCaption);
    const captionB = sanitizeCaption(b.imageCaption);

    if (captionA < captionB) {
      return -1;
    }
    if (captionA > captionB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
