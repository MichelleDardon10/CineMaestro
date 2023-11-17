
describe('Name Ideas Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('[id=user]').type('testuser');
        cy.get('[id=password]').type('testpassword');
        cy.get('.iniciar').first().click();
        
        cy.url().should('eq', 'http://localhost:5173/');

        cy.visit('http://localhost:5173/nameideas');
    });

    it('should display the Name Ideas page', () => {
      cy.get('h2').should('contain.text', 'IDEAS');
      cy.get('input').should('exist');
      cy.get('button').should('exist');
    });
  
    it('should allow user to add an idea', () => {
        cy.get('.input').type('Nueva Idea');
        
        cy.get('button').contains('Add Idea').click();
        
        cy.contains('Nueva Idea').should('exist');
      });
  
      it('should allow user to delete an idea', () => {
        cy.contains('Nueva Idea').should('exist');
    
        cy.get('button').contains('Borrar').click();
    
        cy.contains('Idea a Borrar').should('not.exist');
      });
  });
  