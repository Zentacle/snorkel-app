// import '@testing-library/jest-dom/extend-expect';
import { handlers } from './handlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
server.listen();
