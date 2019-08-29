describe('ImageViewer', () => {
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

  it('does not display anything until an image is selected', () => {
    cy.get('[data-testid=image-viewer]')
      .should('not.exist');
  });
  it('displays an image selected from the Carousel when in View Mode', () => {
    cy.get('[data-testid=carousel-image]')
      .first()
      .click()
      .get('[data-testid=image-viewer]')
      .should('exist');
  });
  it('does not display anything when switching into Edit Mode', () => {
    cy.get('[data-testid=carousel-image]')
      .first()
      .click()
      .get('[data-testid=image-viewer]')
      .should('exist')
      .get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=image-viewer]')
      .should('not.exist');
  });
});
