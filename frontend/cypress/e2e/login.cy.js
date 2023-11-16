
describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');
    });
  
    it('should display the login form', () => {
      cy.get('h2').should('contain.text', 'Iniciar sesión');
      cy.get('[id=user]').should('exist');
      cy.get('[id=password]').should('exist');
      cy.get('.iniciar').should('have.length', 2);
    });
  
    it('should allow user login with valid credentials', () => {
      cy.get('[id=user]').type('testuser');
      cy.get('[id=password]').type('testpassword');
      cy.get('.iniciar').first().click();
  
      cy.url().should('eq', 'http://localhost:5173/');
  
    });
  
    it('should show an error message with invalid credentials', () => {
      cy.get('[id=user]').type('usuario_invalido');
      cy.get('[id=password]').type('contraseña_invalida');
      cy.get('.iniciar').first().click();
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('El usuario no existe');
      });
    });
  
    it('should switch to signup page on button click', () => {
      cy.contains('Registrarse').click();
  
      cy.url().should('eq', 'http://localhost:5173/signup');
    });
  });
  