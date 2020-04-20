describe('Check home page is Ok', () => {
  it('Visit the app', () => {
    cy.visit('/');
  });
  it('Check contains text', () => {
    cy.contains('Be welcome!');
  });
});
