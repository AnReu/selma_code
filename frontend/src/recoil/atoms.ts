import { atom } from 'recoil';

declare interface QueryParametersState {
  db: string
  model: string,
  index: string,
  language: string
}

const defaultQueryParameters: QueryParametersState = {
  db: '',
  model: '',
  index: '',
  language: '',
};

export const queryParametersState = atom<QueryParametersState>({
  key: 'queryParameters',
  default: defaultQueryParameters,
});
