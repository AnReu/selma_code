import { emptySplitApi } from '.';

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

const apiWithConfigs = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getConfigs: build.query<Config, void>({
      query: () => '/configs',
      providesTags: ['Configs'],
    }),
    updateConfigs: build.mutation<Config, Partial<Config>>({
      query: (data) => {
        const { ...body } = data;
        return {
          url: '/configs',
          method: 'POST',
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetConfigsQuery,
  useUpdateConfigsMutation,
} = apiWithConfigs;
