
describe('Prueba del componente Home', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:5174/auth/check').as('authCheck');
    cy.intercept('GET', 'http://localhost:5174/movies').as('getMovies');
    cy.visit('http://localhost:5173');
    cy.wait(['@authCheck', '@getMovies']);
  });

  it('debería mostrar al menos una película', () => {
    cy.get('.movie-card').should('be.visible');
  });

  it('debería marcar/desmarcar una película como vista', () => {
    cy.get('.movie-card').first().as('primeraPelicula');

    cy.get('@primeraPelicula').find('.buttons button').eq(1).click();
    cy.get('@primeraPelicula').find('.buttons button').eq(1).should('contain.text', 'Desmarcar como vista');

    cy.get('@primeraPelicula').find('.buttons button').eq(1).click();
    cy.get('@primeraPelicula').find('.buttons button').eq(1).should('contain.text', 'Marcar como vista');
  });
});

