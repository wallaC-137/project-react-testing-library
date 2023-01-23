import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pokemonInf = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonInf.textContent).toBe('Pikachu Details');
    const moreDetailsNull = screen.queryByRole('link', { name: /more details/i });
    expect(moreDetailsNull).toBe(null);
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary.textContent).toBe('Summary');
    const inf = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(inf).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const locat = screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    expect(locat).toBeInTheDocument();

    const { foundAt } = pokemonList[0];
    const imgsTesteLength = screen.getAllByRole('img', { alt: 'Pikachu location' });
    const totalValue = imgsTesteLength.length - 1;
    expect(totalValue).toBe(foundAt.length);

    foundAt.forEach(({ location, map }, idx) => {
      const { textContent } = screen.getByText(`${location}`);
      expect(textContent).toBe(`${location}`);
      const imgs = screen.getAllByRole('img', { alt: /pikachu location/i });
      expect(imgs[idx + 1].src).toBe(map);
      expect(imgs[idx + 1].alt).toBe('Pikachu location');
    });
  });

  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const isFavoriteTrue = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(checkbox.checked).toBe(true);
    expect(isFavoriteTrue).toBeTruthy();
    userEvent.click(checkbox);
    const isFavoriteFalse = screen.queryByRole('img', { name: /pikachu is marked as favorite/i });
    expect(isFavoriteFalse).toBe(null);
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeTruthy();
  });
});
