import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test('testa se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<App />);

    /* Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos; */

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const pokemonDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonDetails).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favorite);
    const pokemonNotFound = screen.getByText(/no favorite pokémon found/i);
    expect(pokemonNotFound).toBeInTheDocument();
  });

  test('Testa se apenas são exibidos os Pokémon favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémon/i });

    act(() => {
      history.push('/pokemon/25');
    });
    const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favPokemon);
    userEvent.click(favorite);
    const pikachu = screen.getByText(/pikachu/i);
    expect(favorite).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
    const detailsAll = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsAll).toHaveLength(1);
  });
});
