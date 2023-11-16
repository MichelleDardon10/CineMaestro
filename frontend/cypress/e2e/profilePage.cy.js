describe('Profile Page Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');
      cy.get('[id=user]').type('testuser');
      cy.get('[id=password]').type('testpassword');
      cy.get('.iniciar').first().click();
      cy.url().should('eq', 'http://localhost:5173/');
  
      cy.intercept('GET', 'http://localhost:5174/auth/check').as('authCheck');
      cy.visit('http://localhost:5173/profilePage');
      cy.wait('@authCheck');
    });
  
    it('should delete the user account', () => {
      cy.intercept('DELETE', 'http://localhost:5174/auth/*').as('deleteAccount');
  
      cy.get('.goofy-button').click();
  
      cy.wait('@deleteAccount').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
  
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.eq('Cuenta eliminada');
        });
  
        cy.url().should('eq', 'http://localhost:5173/');
      });
    });
  });
  