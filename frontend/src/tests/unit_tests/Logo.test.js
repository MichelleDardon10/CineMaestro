// Logo.test.js
import React from 'react';
import { render, screen } from "@testing-library/react";
import Logo from 'frontend/src/components/Logo.jsx';

test('renderiza Logo correctamente', () => {
  const { container } = render(<Logo />);
  const logoElement = container.querySelector('.navbar-logo');
  const linkElement = container.querySelector('.navbar-logo a');

  expect(logoElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
