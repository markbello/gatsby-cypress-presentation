describe('CarouselImage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click();
  });

  it('displays imageCaption when hovering over a carousel image in view mode', () => {
    cy.get('[data-testid=carousel-image]')
      .first()
      .trigger('mouseover')
      .get('[data-testid=carousel-image-caption]')
      .should('exist');
  });
  it('does not display imageCaption without hovering over the image', () => {
    cy.get('[data-testid=carousel-image]')
      .first()
      .get('[data-testid=carousel-image-caption]')
      .should('not.exist');
  });
});
