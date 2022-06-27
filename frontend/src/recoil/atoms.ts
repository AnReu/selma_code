import { atom } from 'recoil';

declare interface QueryParametersState {
  db: string
  model: string,
  index: string,
  language: string,
  text: string,
  code: string,
  equation: string,
}

const defaultQueryParameters: QueryParametersState = {
  db: '',
  model: '',
  index: '',
  language: '',
  text: '',
  code: '',
  equation: '',
};

export const queryParametersState = atom<QueryParametersState>({
  key: 'queryParameters',
  default: defaultQueryParameters,
});
