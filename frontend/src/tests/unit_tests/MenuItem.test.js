// MenuItem.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MenuItem from 'frontend/src/components/MenuItem.jsx';

test('renderiza MenuItem correctamente', () => {
  // Datos de prueba
  const to = '/ruta';
  const label = 'Enlace';

  // Renderiza el componente dentro de MemoryRouter para manejar las rutas
  const { getByText } = render(
    <MemoryRouter>
      <MenuItem to={to} label={label} />
    </MemoryRouter>
  );

  // Verifica que el enlace se haya renderizado correctamente
  const enlace = getByText(label);
  expect(enlace).toBeInTheDocument();

  // Verifica que el enlace tenga la ruta correcta
  expect(enlace.getAttribute('href')).toBe(to);
});
