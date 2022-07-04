import { atom } from 'recoil';

export type QueryMode = 'default' | 'separated' | 'url' | 'file'
export interface QueryState {
  database: string;
  model: string;
  index: string;
  language: string;
  text: string;
  code: string;
  equation: string;
  mode: QueryMode;
  page: number;
}

export const defaultQuery: QueryState = {
  database: 'codeSearchNet_java',
  model: 'PyterrierModel',
  index: 'default',
  language: 'english',
  text: '',
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
