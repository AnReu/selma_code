import { atom } from 'recoil';

export type QueryMode = 'default' | 'separated' | 'url' | 'file'

declare interface QueryParametersState {
  db: string;
  model: string;
  index: string;
  language: string;
  text: string;
  code: string;
  equation: string;
  mode: QueryMode;
}

const defaultQueryParameters: QueryParametersState = {
  db: '',
  model: '',
  index: '',
  language: 'english',
  text: '',
  code: '',
  equation: '',
  mode: 'default',
};

export const queryParametersState = atom<QueryParametersState>({
  key: 'queryParameters',
  default: defaultQueryParameters,
});
