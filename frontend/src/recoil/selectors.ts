import { atom, selector, useRecoilState } from 'recoil';
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

export interface Config {
  db_path: string;
  db_table_name: string;
  db_content_attribute_name: string;
  dbs_path: string;
  index_path: string;
  indexes_path: string;
  allowed_search_modes: {
    default: boolean,
    separated: boolean,
    url: boolean,
    file: boolean,
  }
}

export const emptyConfig: Config = {
  db_path: '',
  db_table_name: '',
  db_content_attribute_name: '',
  dbs_path: '',
  index_path: '',
  indexes_path: '',
  allowed_search_modes: {
    default: true, separated: true, url: true, file: true,
  },
};

export const configsState = atom({
  key: 'configs',
  default: selector({
    key: 'configsLoader',
    get: async () => {
      const response = await fetch('http://127.0.0.1:5000/api/v1/data-structure');
      return response.formData;
    },
  }),
});

declare interface UpdateConfigsParams {
  id: number
}

function useConfigsMutations() {
  const [configs, setConfigs] = useRecoilState(configsState);

  const updateConfigs = async (updatedConfig: UpdateConfigsParams) {
    await fetch('http://127.0.0.1:5000/api/v1/data-structure', { method: 'POST' })
    //update remotely await put/patch
    // const newConfigs = make a copy of current config, change the updated value
    setConfigs(newConfigs)
  }
}

// const apiWithConfigs = emptySplitApi.injectEndpoints({
//   endpoints: (build) => ({
//     getConfigs: build.query<Config, void>({
//       query: () => '/configs',
//       providesTags: ['Configs'],
//     }),
//     updateConfigs: build.mutation<Config, Partial<Config>>({
//       query: (data) => {
//         const { ...body } = data;
//         return {
//           url: '/configs',
//           method: 'POST',
//           body,
//         };
//       },
//     }),
//   }),
//   overrideExisting: false,
// });
