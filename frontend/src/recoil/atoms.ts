import { atom } from 'recoil';

declare interface QueryParametersState {
  db: string
  model: string,
  index: string,
  language: string,
  text: string,
}

const defaultQueryParameters: QueryParametersState = {
  db: '',
  model: '',
  index: '',
  language: '',
  text: '',
};

export const queryParametersState = atom<QueryParametersState>({
  key: 'queryParameters',
  default: defaultQueryParameters,
});
