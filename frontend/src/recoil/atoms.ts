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
  database: 'codeSearchNet_java',
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

export const queryState = atom<QueryState>({
  key: 'query',
  default: defaultQuery,
});

export interface QueryErrors {
  text?: string;
  database?: string;
  model?: string;
}
