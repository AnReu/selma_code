import { rest } from 'msw';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { Result } from '../app/services/results';
import { cfg, r1, r2 } from './dummy-data';

const adapter = createEntityAdapter<Result>();

// eslint-disable-next-line import/no-mutable-exports
let state = adapter.getInitialState();
state = adapter.setAll(state, [r1, r2]);

export { state };

const baseUrl = 'http://localhost/api/v1';

export const handlers = [
  rest.get(`${baseUrl}/results`, (req, res, ctx) => res(ctx.json([r1, r2]))),
  rest.get(`${baseUrl}/languages`, (req, res, ctx) => res(ctx.json(['english', 'german']))),
  rest.get(`${baseUrl}/models`, (req, res, ctx) => res(ctx.json(['pyterrier', 'vector', 'coolModel', 'oneMoreFakeModel']))),
  rest.get(`${baseUrl}/configs`, (req, res, ctx) => res(ctx.json(cfg))),
  rest.get(`${baseUrl}/dbs`, (req, res, ctx) => res(ctx.json(['db1', 'db2', 'myDb33']))),
];
