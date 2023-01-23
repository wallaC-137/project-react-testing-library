import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('6. Testa o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(({ name }) => {
      const { textContent } = screen.getByTestId('pokemon-name');

      expect(textContent).toBe(name);
      userEvent.click(nextPokemon);
    });
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(({ type }) => {
      const { textContent } = screen.getByTestId('pokemon-type');

      expect(textContent).toBe(type);
      userEvent.click(nextPokemon);
    });
  });

  test('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight:', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(({ averageWeight: { value, measurementUnit } }) => {
      const { textContent } = screen.getByTestId('pokemon-weight');

      expect(textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
      userEvent.click(nextPokemon);
    });
  });

  test('A imagem do Pokémon deve ser exibida. URL da imagem e um atributo alt:', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(({ image, name }) => {
      const { src, alt } = screen.getByRole('img');

      expect(src).toBe(image);
      expect(alt).toBe(`${name} sprite`);
      userEvent.click(nextPokemon);
    });
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach(({ id }) => {
      const { href } = screen.getByRole('link', { name: /more details/i });

      expect(href).toBe(`http://localhost/pokemon/${id}`);
      userEvent.click(nextPokemon);
    });
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { textContent } = screen.getByRole('heading', { name: /pikachu details/i });
    expect(textContent).toBe('Pikachu Details');

    // codigo comenta abaixo era para testar a entrada em todos os cards para ver se renderizariam corretamente, mas tive problemas em implementar
    /* const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const home = screen.getByRole('link', { name: /home/i });

    pokemonList.forEach(({ name }, idx) => {
      const details = screen.getByRole('link', { name: /more details/i });

      if (name) {
        const aa = screen.getByRole('heading', { name: /details/i });
        userEvent.click(details);
        const pokemonName = screen.queryByRole('heading', { name: `${name} Details`, level: 2 });
        console.log(pokemonName.textContent);
        console.log(name, pokemonName.textContent);
        userEvent.click(home);
      }
      userEvent.click(nextPokemon);
    }); */
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    renderWithRouter(<App />);
    const aa = screen.getByRole('link', { name: /more details/i });
    userEvent.click(aa);
    const pokemonName = screen.getByRole('heading', { name: /pikachu details/i });
    expect(pokemonName).toBeInTheDocument();
    const labelCheckbox = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(labelCheckbox);
    const { src, alt } = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(src).toBe('http://localhost/star-icon.svg');
    expect(alt).toBe('Pikachu is marked as favorite');
  });
});
