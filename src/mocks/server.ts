// import '@testing-library/jest-dom/extend-expect';
import { handlers } from './handlers';
import { setupServer } from 'msw/node';
import 'isomorphic-fetch';

export const server = setupServer(...handlers);
server.listen();
