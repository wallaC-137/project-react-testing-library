import React from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('4. Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found;', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/error-test');
    });
    const notFoundText = screen.getByRole('heading', { name: /page requested not found/i, level: 2 });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/error-test');
    });
    const { src } = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
