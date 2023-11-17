describe('Playlist Page', () => {
    beforeEach(() => {
        cy.intercept('DELETE', 'http://localhost:5174/playlist/*').as('deletePlaylist');
        cy.visit('http://localhost:5173/Playlist'); 
    });
  
    it('should display the Playlist Page', () => {
      cy.get('.playlist-title').should('contain.text', 'My Playlists');
      cy.get('.playlist-input').should('exist');
      cy.get('button').contains('Create Playlist').should('exist');
      cy.get('ul').should('exist');
    });
  
    it('should allow user to create a new playlist', () => {
      const playlistName = 'New Playlist';
  
      cy.get('.playlist-input').type(playlistName);
      cy.get('button').contains('Create Playlist').click();
  
      cy.get('ul').contains(playlistName).should('exist');
    });
  
    it('should allow user to remove a playlist', () => {
        cy.get('ul li').first().invoke('text').then((playlistName) => {
          cy.get('ul').contains(playlistName).should('exist');
    
          cy.get('ul li').first().find('.remove-button').click();
    
          cy.get('ul').contains(playlistName).should('not.exist');
        });
    });
  
  });
  