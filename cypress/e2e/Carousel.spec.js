import { carouselImages } from '../../src/images/carouselImages.json';

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
});
