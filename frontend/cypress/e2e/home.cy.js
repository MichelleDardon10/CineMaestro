
describe('Prueba del componente Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
    cy.get('[id=user]').type('testuser');
    cy.get('[id=password]').type('testpassword');
    cy.get('.iniciar').first().click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.intercept('GET', 'http://localhost:5174/auth/check').as('authCheck');
    cy.intercept('GET', 'http://localhost:5174/movies').as('getMovies');
    cy.visit('http://localhost:5173');
    cy.wait(['@authCheck', '@getMovies']);
  });

  it('should display at least one movie', () => {
    cy.get('.movie-card').should('be.visible');
  });

  it('should mark a movie as viewed', () => {
    cy.get('.movie-card').first().as('firstMovie');

    cy.get('@firstMovie').find('.buttons button').eq(1).should('contain.text', 'Marcar como vista');
    cy.get('@firstMovie').find('.buttons button').eq(1).click();
  });

  it('should unmark a movie as viewed', () => {

    cy.get('.movie-card').first().as('firstMovie');

    cy.get('@firstMovie').find('.buttons button').eq(1).should('contain.text', 'Desmarcar como vista');
    cy.get('@firstMovie').find('.buttons button').eq(1).click();
  });

  it('should delete a movie', () => {
    cy.get('.movie-card').first().as('firstMovie');

    cy.get('@firstMovie').invoke('attr', 'key').then((id) => {
      cy.get('@firstMovie').contains('Borrar').click();

      cy.get('.movies-list').should('not.contain', id);
    });
  });
});

