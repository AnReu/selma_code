import { atom } from 'recoil';

export type QueryMode = 'default' | 'separated' | 'url' | 'file'
export interface QueryState {
  database: string;
  model: string;
  index: string;
  language: string;
  text?: string;
  url?: string;
  code?: string;
  equation?: string;
  mode: QueryMode;
  page: number;
}

export const defaultQuery: QueryState = {
  database: '',
  model: '',
  index: '',
  language: 'english',
  text: '',
  url: '',
  code: '',
  equation: '',
  mode: 'default',
  page: 1,
};

// const queryChecker = object({
//   db: string(),
//   model: string(),
//   index: string(),
//   language: string(),
//   text: string(),
//   code: string(),
//   equation: string(),
//   mode: string(),
//   page: number(),
// });

export const queryState = atom<QueryState>({
  key: 'query',
  default: defaultQuery,
  // effects: [urlSyncEffect({ refine: queryChecker })],
});
