import { atom, selector, useRecoilState } from 'recoil';
import { QueryMode, queryState } from './atoms';

const baseURL = 'http://127.0.0.1:5000/api/v1';

export const queryStringState = selector({
  key: 'searchParameters',
  get: ({ get }) => {
    const {
      text, db, model, index, language, page,
    } = get(queryState);
    return `?text=${text}&db=${db}&model=${model}&index=${index}&language=${language}&page=${page}`;
  },
});

export const dataStructureQueryState = selector({
  key: 'dataStructure',
  get: async () => {
    const response = await fetch(`${baseURL}/data-structure`, { mode: 'cors' });
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
    const { db } = get(queryState);
    const data = get(dataStructureQueryState);
    if (data[db]) {
      return Object.keys(data[db]);
    }
    return [];
  },
});

export const filteredIndexesState = selector<string[]>({
  key: 'filteredIndexes',
  get: ({ get }) => {
    const data = get(dataStructureQueryState);
    const { db, model } = get(queryState);
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
  index_path: string;
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
  index_path: '',
  allowed_search_modes: {
    default: true, separated: true, url: true, file: true,
  },
};

export const emptyExample: Example = {
  name: '',
  model: '',
  mode: 'default',
  language: '',
  text: '',
  code: '',
  equation: '',
  url: '',
  db: '',
  index: '',
};

export interface Example {
  id?: number;
  name: string;
  model: string;
  mode: QueryMode;
  language: string;
  text: string;
  code: string;
  equation: string;
  url: string;
  db: string;
  index: string;
}

export const examplesState = atom<Example[]>({
  key: 'examples',
  default: selector<Example[]>({
    key: 'examplesLoader',
    get: async () => {
      const response = await fetch(`${baseURL}/query-templates`, { mode: 'cors' });
      return response.json();
    },
  }),
});

export const configsState = atom<Config>({
  key: 'configs',
  default: selector<Config>({
    key: 'configsLoader',
    get: async () => {
      const response = await fetch(`${baseURL}/configs`, { mode: 'cors' });
      return response.json();
    },
  }),
});

export declare interface UpdateConfigsParams {
  db_path?: string,
  db_table_name?: string,
  db_content_attribute_name?: string,
  index_path?: string,
  allowed_search_modes?: {
    default?: boolean, separated?: boolean, url?: boolean, file?: boolean,
  },
}

export function useConfigsMutations() {
  const [, setConfigs] = useRecoilState(configsState);

  const updateConfigs = async (updatedConfigs: UpdateConfigsParams) => {
    await fetch(`${baseURL}/configs`,
      {
        method: 'POST',
        body: JSON.stringify(updatedConfigs),
        headers: { 'Content-Type': 'application/json' },
      });
    setConfigs(emptyConfig);
  };

  return { updateConfigs };
}
