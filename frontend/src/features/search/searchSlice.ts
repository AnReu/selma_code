import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template } from '../../app/services/templates';
import { RootState } from '../../app/store';

export type SearchMode = 'default' | 'separated' | 'url' | 'file';

export interface SearchState {
  language: string;
  model: string;
  mode: SearchMode;
  text: string;
  code: string;
  equation: string;
  url: string;
  file: string;
  params: string | null;
  exchange: string;
  db: string;
}

const initialState: SearchState = {
  language: 'english',
  model: 'PyterrierModel',
  mode: 'default',
  text: '',
  code: '',
  equation: '',
  url: '',
  file: '',
  params: null,
  exchange: '',
  db: 'postdb.db',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setURL: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setEquation: (state, action: PayloadAction<string>) => {
      state.equation = action.payload;
    },
    setMode: (state, action: PayloadAction<SearchMode>) => {
      state.mode = action.payload;
    },
    setExchange: (state, action: PayloadAction<string>) => {
      state.exchange = action.payload;
    },
    setDb: (state, action: PayloadAction<string>) => {
      state.db = action.payload;
    },
    setParams: (state) => {
      const {
        language, model, mode, text, code, equation, exchange, url, db,
      } = state;
      switch (mode) {
        case 'default':
          state.params = `text=${text}&`
          + `model=${model}&`
          + `model-language=${language}&`
          + `db=${db}`;
          break;
        case 'separated':
          state.params = `code=${code}&`
          + `equations=${equation}&`
          + `model=${model}&`
          + `model-language=${language}&`
          + `db=${db}`;
          break;
        case 'url':
          state.params = `id=${encodeURIComponent(url)}&`
          + `exchange=${encodeURIComponent(exchange)}&`
          + `model=${encodeURIComponent(model)}&`
          + `model-language=${encodeURIComponent(language)}`
          + `db=${db}`;
          break;
        case 'file':
          state.params = `id=${encodeURIComponent(url)}&`
          + `exchange=${encodeURIComponent(exchange)}&`
          + `model=${encodeURIComponent(model)}&`
          + `model-language=${encodeURIComponent(language)}`
          + `db=${db}`;
          break;

        default:
          state.params = 'action.payload';
          break;
      }
    },
    applyTemplate: (state, action: PayloadAction<Template>) => {
      const {
        model,
        language,
        mode,
        text,
        code,
        equation,
        url,
        database,
      } = action.payload;
      state.model = model;
      state.language = language;
      state.mode = mode as SearchMode;
      state.text = text;
      state.code = code;
      state.equation = equation;
      state.url = url;
      state.db = database;
    },
  },
});

export const {
  setDb,
  setLanguage,
  setModel,
  setText,
  setMode,
  setCode,
  setEquation,
  setURL,
  setFile,
  setParams,
  applyTemplate,
} = searchSlice.actions;
export const selectCode = (state: RootState) => state.search.code;
export const selectEquation = (state: RootState) => state.search.equation;
export const selectLanguage = (state: RootState) => state.search.language;
export const selectURL = (state: RootState) => state.search.url;
export const selectModel = (state: RootState) => state.search.model;
export const selectMode = (state: RootState) => state.search.mode;
export const selectDb = (state: RootState) => state.search.db;
export const selectText = (state: RootState) => state.search.text;
export const selectParams = (state: RootState) => state.search.params;
export const selectSearchState = (state: RootState) => state.search;
export default searchSlice.reducer;
