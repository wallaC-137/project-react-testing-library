import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('2. Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const headingInfo = screen.getByRole('heading', { name: /about pokédex/i });
    expect(headingInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const lengthToPokedex = screen.getAllByText(/Pokédex/i);
    expect(lengthToPokedex).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const { src } = screen.getByRole('img', { name: /pokédex/i });
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
