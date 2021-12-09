import { emptySplitApi } from '.';

export interface Result {
    acceptedAnswerId: number | null;
    body: string,
    id: number;
    parentId: number;
    postTypeId: number;
    title: string;
    tags: string | null;
    cut: boolean;
    relevantSentence: string;
}

// TODO: change the response data structure in the backend then here.
type ResultsResponse = { results: Result[] };

const apiWithResults = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query<ResultsResponse, string | Symbol>({
      // TODO: change url to search?${params} AND add params as argument
      query: (params) => `/search?${params}`,
      providesTags: ['Results'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetResultsQuery } = apiWithResults;
