import { rsApi } from './index';

const languagesApi = rsApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: () => ({ url: '/languages' }),
    // TODO: check what this does
      // provides: (result) => [
      //   ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
      //   { type: 'Posts', id: 'LIST' },
      // ],
    }),
    // getErrorProne: builder.query({
    //   query: () => 'error-prone',
    // }),
  }),
  // You will get a warning if you inject an endpoint that already exists
  // in development mode when you don't explicitly specify overrideExisting: true.
  // You will not see this in production and the existing endpoint will just be overriden,
  // so make sure to account for this in your tests.
  overrideExisting: false,
});

export const { useGetLanguagesQuery } = languagesApi;
