import { carouselImages } from '../../src/images/carouselImages.json';
import lang from '../../src/core/langPack.json';

describe('Carousel', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click();
  });

  it('starts with "previous" button disabled', () => {
    cy.get('[data-testid=button-previous]')
      .should('be.disabled');
  });
  it('starts with "next" button disabled', () => {
    cy.get('[data-testid=button-next]')
      .should('be.disabled');
  });
  it('keeps the "next" button disabled at the initial rowLimit', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-next]')
      .should('be.disabled');
  });
  it('enables the "next" button when rowLimit initially exceeded', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-next]')
      .should('not.be.disabled');
  });
  it('disables the "next" button on the final row of images', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-next]')
      .click()
      .get('[data-testid=button-next]')
      .should('be.disabled');
  });
  it('shows the full rowLimit of images on the last row by carrying over images from the left', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-next]')
      .click()
      .get('[data-testid=button-next]')
      .should('be.disabled')
      .get('[data-testid=carousel-image]')
      .should('have.length', 2);
  });
  it('disables the "previous" button when going back to the first row of images', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-next]')
      .click()
      .get('[data-testid=button-previous]')
      .click()
      .get('[data-testid=button-previous]')
      .should('be.disabled');
  });
  it('updates the carousel when a new rowLimit is selected', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .first()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=dropdown-rowlimit]')
      .select('3')
      .get('[data-testid=carousel-image]')
      .should('have.length', 3);
  });
  it('restarts the Carousel at the beginning when changing rowLimit', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 2)
      .get('[data-testid=button-next]')
      .click()
      .get('[data-testid=dropdown-rowlimit]')
      .select('3')
      .get('[data-testid=carousel-image]')
      .should('have.length', 3);
  });
  it('toggles into edit mode when the view-mode button is clicked', () => {
    cy.get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=button-view-mode]')
      .should('have.text', lang.viewModeLabel);
  });
  it('toggles back to view mode when the view-mode button is clicked a second time', () => {
    cy.get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=button-view-mode]')
      .click()
      .should('have.text', lang.editModeLabel);
  });
  it('applies "selected" class when user clicks an image in Edit Mode', () => {
    cy.get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .click()
      .should('have.class', 'selected');
  });
  it('removes "selected" class when user clicks an image in Edit Mode a second time', () => {
    cy.get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .click()
      .should('have.class', 'selected')
      .click()
      .should('not.have.class', 'selected');
  });
  it('removes "selected" class when user toggles back into View Mode', () => {
    cy.get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .click()
      .should('have.class', 'selected')
      .get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .should('not.have.class', 'selected');
  });
  it('removes a selected image in Edit Mode when the Remove button is clicked', () => {
    cy.get('[data-testid=thumbnail]')
      .last()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .click()
      .get('[data-testid=button-remove]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 1);
  });
  it('repopulates a removed carousel image back into the ImageSelector', () => {
    cy.get('[data-testid=thumbnail]')
      .last()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=thumbnail]')
      .should('have.length', carouselImages.length - 2)
      .get('[data-testid=button-view-mode]')
      .click()
      .get('[data-testid=carousel-image]')
      .first()
      .click()
      .get('[data-testid=button-remove]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 1)
      .get('[data-testid=thumbnail]')
      .should('have.length', carouselImages.length - 1);
  });
  it('shows one image-set-dot "•" when there is only one set to show', () => {
    cy.get('[data-testid=carousel-image]')
      .should('have.length', 1)
      .get('[data-testid=carousel-image-set-dot]')
      .should('have.length', 1);
  });
  it('shows more than one image-set-dot "•" when there are multiple imageSets to show', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 2)
      .get('[data-testid=carousel-image-set-dot]')
      .should('have.length', 2);
  });
  it('applies the selectedNavDot class to the imageSet in focus', () => {
    cy.get('[data-testid=carousel-image]')
      .should('have.length', 1)
      .get('[data-testid=carousel-image-set-dot]')
      .first()
      .should('have.class', 'selectedNavDot');
  });
  it('applies the unselectedNavDot class to the imageSet not in focus', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 2)
      .get('[data-testid=carousel-image-set-dot]')
      .next()
      .should('have.class', 'unselectedNavDot');
  });
  it('changes the selectedNavDot class when moving between imageSets', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .next()
      .click()
      .get('[data-testid=addButton]')
      .click()
      .get('[data-testid=carousel-image]')
      .should('have.length', 2)
      .get('[data-testid=carousel-image-set-dot]')
      .next()
      .should('have.class', 'unselectedNavDot')
      .get('[data-testid=button-next]')
      .click()
      .get('[data-testid=carousel-image-set-dot]')
      .first()
      .should('have.class', 'unselectedNavDot')
      .next()
      .should('have.class', 'selectedNavDot');
  });
});
