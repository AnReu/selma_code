import { emptySplitApi } from '.';

const apiWithDatabases = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getDatabases: build.query<string[], void>({
      query: () => '/dbs',
      providesTags: ['Databases'],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetDatabasesQuery,
} = apiWithDatabases;
