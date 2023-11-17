// LogoutButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogoutButton from 'frontend/src/components/LogoutButton.jsx';

test('renderiza LogoutButton correctamente', () => {
  // Simula una función de clic
  const mockOnClick = jest.fn();

  // Renderiza el componente
  const { getByText } = render(<LogoutButton onClick={mockOnClick} />);

  // Verifica que el botón se haya renderizado correctamente
  const botonCerrarSesion = getByText(/Cerrar sesión/);
  expect(botonCerrarSesion).toBeInTheDocument();

  // Simula un clic en el botón
  fireEvent.click(botonCerrarSesion);

  // Verifica que la función de clic haya sido llamada
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
