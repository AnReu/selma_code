import { emptySplitApi } from '.';

type LanguagesResponse = string[];

const apiWithLanguages = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getLanguages: builder.query<LanguagesResponse, void>({
      query: () => '/languages',
      providesTags: ['Languages'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLanguagesQuery } = apiWithLanguages;
