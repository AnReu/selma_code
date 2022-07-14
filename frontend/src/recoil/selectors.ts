import { atom, selector, useRecoilState } from 'recoil';
import { QueryMode, queryState } from './atoms';

const baseURL = 'http://localhost:5000/api/v1';
const headers = { 'Content-Type': 'application/json' };

export const dataStructureQueryState = selector({
  key: 'dataStructure',
  get: async () => {
    const response = await fetch(`${baseURL}/data-structure`, { mode: 'no-cors' });
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
    const { database } = get(queryState);
    const data = get(dataStructureQueryState);
    if (data[database]) {
      return Object.keys(data[database]);
    }
    return [];
  },
});

export const filteredIndexesState = selector<string[]>({
  key: 'filteredIndexes',
  get: ({ get }) => {
    const data = get(dataStructureQueryState);
    const { database, model } = get(queryState);
    if (data[database] && data[database][model]) {
      return data[database][model];
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
  database: '',
  index: '',
};

export interface Example {
  id?: number;
  name: string;
  model: string;
  mode: QueryMode;
  language: string;
  text?: string;
  code?: string;
  equation?: string;
  url?: string;
  database: string;
  index: string;
}

export const examplesState = atom<Example[]>({
  key: 'examples',
  default: selector<Example[]>({
    key: 'examplesLoader',
    get: async () => {
      const response = await fetch(`${baseURL}/query-templates`);
      return response.json();
    },
  }),
});

export const configsState = atom<Config>({
  key: 'configs',
  default: selector<Config>({
    key: 'configsLoader',
    get: async () => {
      const response = await fetch(`${baseURL}/configs`);
      const data = await response.json();
      return data;
    },
  }),
});

export function useExamplesMutations() {
  const [, setExamples] = useRecoilState(examplesState);

  const createExample = async (example: Example) => {
    const response = await fetch(`${baseURL}/query-templates`,
      {
        method: 'POST',
        body: JSON.stringify(example),
        headers,
      });
    const data = await response.json();
    const newExample = data.queryTemplate;
    setExamples((oldExamples) => [...oldExamples, newExample]);
  };

  const deleteExample = async (exampleId: number) => {
    await fetch(`${baseURL}/query-templates/${exampleId}`,
      {
        method: 'DELETE',
        headers,
      });
    setExamples((oldExamples) => oldExamples.filter((example) => example.id !== exampleId));
  };

  return { createExample, deleteExample };
}

export function useConfigsMutations() {
  const [, setConfigs] = useRecoilState(configsState);

  const updateConfigs = async (configs: Config) => {
    const response = await fetch(`${baseURL}/configs`,
      {
        method: 'POST',
        body: JSON.stringify(configs),
        headers,
      });
    const data = await response.json();
    setConfigs(data);
  };

  return { updateConfigs };
}
