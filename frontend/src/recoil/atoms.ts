import { atom } from 'recoil';

export type QueryMode = 'default' | 'separated' | 'url' | 'file'

declare interface QueryState {
  db: string;
  model: string;
  index: string;
  language: string;
  text: string;
  code: string;
  equation: string;
  mode: QueryMode;
  page: number;
}

const defaultQuery: QueryState = {
  db: '',
  model: '',
  index: '',
  language: 'english',
  text: '',
  code: '',
  equation: '',
  mode: 'default',
  page: 1,
};

export const queryState = atom<QueryState>({
  key: 'queryParameters',
  default: defaultQuery,
});
