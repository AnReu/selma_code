import { setupServer } from 'msw/node';
import { handlers, state } from './handlers';

export const mockServer = () => {
  const server = setupServer(...handlers);

  return { server, state };
};
