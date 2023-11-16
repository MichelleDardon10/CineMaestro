describe('Movies Form Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('[id=user]').type('testuser');
        cy.get('[id=password]').type('testpassword');
        cy.get('.iniciar').first().click();
    
        cy.url().should('eq', 'http://localhost:5173/');
        cy.visit('http://localhost:5173/AddMovie');
    });
    
    it('should allow user login with valid credentials', () => {
        cy.visit('http://localhost:5173/login');
        cy.get('[id=user]').type('testuser');
        cy.get('[id=password]').type('testpassword');
        cy.get('.iniciar').first().click();
    
        cy.url().should('eq', 'http://localhost:5173/');
    
      });

    it('should display the Movies Form', () => {
      cy.get('h2').should('contain.text', 'Agregar Película');
      cy.get('[name=titulo]').should('exist');
      cy.get('[name=director]').should('exist');
      cy.get('[name=genero]').should('exist');
      cy.get('[name=fechaEstreno]').should('exist');
      cy.get('.button').should('exist');
    });
  
    it('should allow user to add a movie with valid data', () => {
      cy.get('[name=titulo]').type('Nombre de la Película');
      cy.get('[name=director]').type('Director de la Película');
      cy.get('[name=genero]').type('Género de la Película');
      cy.get('[name=fechaEstreno]').type('2023-01-01');
      
      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alert');
      });
  
      cy.get('.button').click();
  
      cy.get('@alert').should('be.calledWith', 'Película agregada exitosamente');
    });
  
    it('should show an alert with error message for invalid data', () => {

      cy.window().then((win) => {
        cy.spy(win, 'alert').as('alert');
      });
  
      cy.get('.button').click();
  
      cy.get('@alert').should('be.calledWith', 'Error al realizar la solicitud: Request failed with status code 500');
    });
  
  });
  