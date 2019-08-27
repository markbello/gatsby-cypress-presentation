import { carouselImages } from '../../src/images/carouselImages.json';

describe('ImageSelector', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('applies "selected" class when user clicks an image', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .should('have.class', 'selected');
  });
  it('removes "selected" class when user clicks a selected image', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .should('have.class', 'selected')
      .click()
      .should('not.have.class', 'selected');
  });
  it('enables "add" button when an image is selected', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .should('not.be.disabled');
  });
  it('disables "add" button when no images are selected', () => {
    cy.get('[data-testid=addButton]')
      .should('be.disabled');
  });
  it('removes Thumbnail images from ImageSelector after adding them', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .should('have.length', (carouselImages.length - 1));
  });
});
