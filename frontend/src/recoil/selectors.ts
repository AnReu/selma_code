import { selector } from 'recoil';
import { queryParametersState } from './atoms';

export const searchParamsState = selector({
  key: 'searchParameters',
  get: ({ get }) => {
    const { db, language, model } = get(queryParametersState);
    return `q?=language=${language}&model=${model}&db=${db}`;
  },
});

export const dataStructureQueryState = selector({
  key: 'dataStructure',
  get: async () => {
    const response = await fetch('http://127.0.0.1:5000/api/v1/data-structure');
    return response.json();
  },
});

export const dbsState = selector<string[]>({
  key: 'dbs',
  get: ({ get }) => {
    const data = get(dataStructureQueryState);
    return Object.keys(data);
  },
});

export const filteredModelsState = selector<string[]>({
  key: 'filteredModels',
  get: ({ get }) => {
    const { db: selectedDb } = get(queryParametersState);
    const data = get(dataStructureQueryState);
    if (data[selectedDb]) {
      return Object.keys(data[selectedDb]);
    }
    return [];
  },
});

export const filteredIndexesState = selector<string[]>({
  key: 'filteredIndexes',
  get: ({ get }) => {
    const data = get(dataStructureQueryState);
    const { db, model } = get(queryParametersState);
    if (data[db] && data[db][model]) {
      return data[db][model];
    }
    return [];
  },
});

export const languagesState = selector<string[]>({
  key: 'languages',
  get: () => ['english'],
});
