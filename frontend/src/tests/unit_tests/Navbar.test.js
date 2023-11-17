// Navbar.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from 'frontend/src/components/Navbar.jsx';

test('renderiza Navbar correctamente', () => {
  // Mock de la función de cierre de sesión
  const mockLogout = jest.fn();

  // Renderiza el componente dentro de MemoryRouter para manejar las rutas
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar authState={{ status: true }} logout={mockLogout} />
    </MemoryRouter>
  );

  // Verifica que los elementos del Navbar se hayan renderizado correctamente
  const addMovieLink = getByText('Añadir Pelicula');
  const nameMoviesLink = getByText('Name movies');
  const playlistLink = getByText('Playlist');
  const profileLink = getByText('Perfil');
  const logoutButton = getByText('Cerrar sesión');

  
  expect(addMovieLink).toBeInTheDocument();
  expect(nameMoviesLink).toBeInTheDocument();
  expect(playlistLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();

  // Simula un clic en el botón de cierre de sesión
  fireEvent.click(logoutButton);

  // Verifica que la función de cierre de sesión haya sido llamada
  expect(mockLogout).toHaveBeenCalledTimes(1);
});
