describe('Check Pokemons page is OK', () => {
  it('Visit pokemons page', () => {
    cy.visit('/pokemons');
  });
  it('Check bulbasaur is on page', () => {
    cy.contains('bulbasaur');
  });
});

describe('Clicking and details of pokemon', () => {
  it('Visit pokemons page', () => {
    cy.visit('/pokemons');
  });
  it('Click on card', () => {
    cy.get('.card').contains('bulbasaur').click();
  });
});

describe('Check if the next page if have pidgey', () => {
  it('Visit pokemons page', () => {
    cy.visit('/pokemons');
  });
  it('Click on next button', () => {
    cy.get('.btn--primary').contains('Next').click();
  });
  it('Search pidgey', () => {
    cy.contains('pidgey');
  });
});
