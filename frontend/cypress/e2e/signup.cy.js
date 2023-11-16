describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/signup');
    });
  
    it('should display the signup form', () => {
      cy.get('h2').should('contain.text', 'Registrarse');
      cy.get('form').should('exist');
      cy.get('button[type="submit"]').should('contain.text', 'Aceptar');
      cy.get('button').contains('Iniciar sesion').should('exist');
    });
  
    it('should allow user registration', () => {
      const username = 'testuser';
      const password = 'testpassword';
  
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
  
    });
  
    it('should switch to login page on button click', () => {
      cy.get('button').contains('Iniciar sesion').click();
  
      cy.url().should('include', '/login');
    });
  });
  