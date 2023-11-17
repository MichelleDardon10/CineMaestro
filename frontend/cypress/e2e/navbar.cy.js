
describe('Navbar Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/login');
        cy.get('[id=user]').type('testuser');
        cy.get('[id=password]').type('testpassword');
        cy.get('.iniciar').first().click();
    
        cy.url().should('eq', 'http://localhost:5173/');
    });
  
    it('should render menu items based on authentication status', () => {
      cy.get('.navbar-menu').should('exist');
      cy.get('.navbar-menu').contains('Añadir Pelicula').should('exist');
      cy.get('.navbar-menu').contains('Name movies').should('exist');
      cy.get('.navbar-menu').contains('Playlist').should('exist');
      cy.get('.navbar-menu').contains('Perfil').should('exist');
    });
    
    it('should display the "Cerrar sesión" button when authenticated', () => {
        cy.get('.logout-button').should('be.visible').and('contain.text', 'Cerrar sesión');
    });
    
    it('should render "Login" button after "Cerrar sesión" button is clicked', () => {
        cy.get('.logout-button').contains('Cerrar sesión').click();
        cy.get('.navbar-menu').contains('Login').should('exist');
    });
  });
