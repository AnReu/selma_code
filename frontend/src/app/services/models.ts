import { emptySplitApi } from '.';

type ModelsResponse = string[];

const apiWithModels = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<ModelsResponse, void>({
      query: () => '/models',
      providesTags: ['Models'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetModelsQuery } = apiWithModels;
