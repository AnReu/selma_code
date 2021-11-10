import { emptySplitApi } from '.';

const apiWithDatabases = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getDatabases: build.query<string[], void>({
      query: () => '/dbs',
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetDatabasesQuery,
} = apiWithDatabases;
