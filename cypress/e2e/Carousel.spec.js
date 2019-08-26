describe('ImageSelector', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('Applies "selected" class when user clicks an image', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .should('have.class', 'selected');
  });
  it('Removes "selected" class when user clicks a selected image', () => {
    cy.get('[data-testid=thumbnail]')
      .first()
      .click()
      .should('have.class', 'selected')
      .click()
      .should('not.have.class', 'selected');
  });
});
