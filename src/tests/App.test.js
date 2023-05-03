import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste App', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação (Home, About e Favorite Pokémon)', () => {
    renderWithRouter(<App />);

    const captureHome = screen.getByRole('link', { name: 'Home' });
    const captureAbout = screen.getByRole('link', { name: 'About' });
    const captureFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(captureHome).toBeInTheDocument();
    expect(captureAbout).toBeInTheDocument();
    expect(captureFavoritePokemon).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const captureHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(captureHome);

    const { pathname } = history.location;

    expect(captureHome).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const captureAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(captureAbout);

    const { pathname } = history.location;

    expect(captureAbout).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const captureAbout = screen.getByRole('link', { name: 'Favorite Pokémon' });

    userEvent.click(captureAbout);

    const { pathname } = history.location;

    expect(captureAbout).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/algumacoisa');
    });

    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    const { pathname } = history.location;

    expect(notFound).toBeInTheDocument();
    expect(pathname).toBe('/algumacoisa');
  });
});
