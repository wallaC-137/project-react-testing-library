import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('5. Testa o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonNext = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair', 'Pikachu'];

    pokemonNext.forEach((pokemon) => {
      userEvent.click(nextPokemon);
      const pokemonName = screen.getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
    });
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getAllByRole('link', { name: /more details/i });
    expect(moreDetails[0]).toBeInTheDocument();
    expect(moreDetails).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const getBtnFilter = screen.getAllByTestId('pokemon-type-button');
    const btnAll = screen.getByRole('button', { name: /all/i });
    getBtnFilter.forEach(({ textContent }) => {
      const button = screen.getByRole('button', { name: textContent });
      expect(button).toBeInTheDocument();
    });
    expect(btnAll).toBeInTheDocument();
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo;', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    const reference = screen.getByRole('button', { name: /fire/i });
    const btn = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(reference);
    expect(pokemonType.textContent).toBe(reference.textContent);

    userEvent.click(btn);
    expect(pokemonType.textContent).toBe(reference.textContent);

    userEvent.click(btn);
    expect(pokemonType.textContent).toBe(reference.textContent);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnFire = screen.getByRole('button', { name: /fire/i });

    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnFire);
    const reference = screen.getByText(/charmander/i);
    expect(reference).toBeInTheDocument();

    userEvent.click(btnAll);
    const initialPokemon = screen.getByText(/pikachu/i);
    expect(initialPokemon).toBeInTheDocument();
  });
});
