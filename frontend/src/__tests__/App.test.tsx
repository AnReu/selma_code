import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../test-utils';
// import { rest } from 'msw';
// import { server } from './test/server';

describe('App', () => {
  it.skip('handles good response', async () => {
    renderWithProviders(<App />);

    screen.getByText('Loading...');

    await screen.findByRole('heading', { name: /bulbasaur/i });

    const img = screen.getByRole('img', {
      name: /bulbasaur/i,
    }) as HTMLImageElement;

    expect(img.src).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    );
  });

  // it('handles error response', async () => {
  //   // force msw to return error response
  //   server.use(
  //     rest.get(
  //       'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  //       (req, res, ctx) => {
  //         return res(ctx.status(500))
  //       }
  //     )
  //   )

  //   renderWithProviders(<App />)

  //   screen.getByText('Loading...')

  //   await screen.findByText('Oh no, there was an error')
  // })
});
