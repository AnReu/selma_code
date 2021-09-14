import { rsApi } from './index';

const modelsApi = rsApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query({
      query: () => ({ url: '/models' }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetModelsQuery } = modelsApi;
