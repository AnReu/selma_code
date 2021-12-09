import { emptySplitApi } from '.';

export interface Relevance {
  query: {
    id: number;
    code: string;
    text: string;
    equations: string;
    exchange: string;
  };
  result_id: number;
  value: 'yes' | 'no';
}

type RelevanceResponse = any;

const apiWithRelevances = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addRelevance: builder.mutation<RelevanceResponse, Relevance>({
      query(body) {
        return {
          url: '/relevance',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Relevances'],
    }),
  }),
  overrideExisting: false,
});

export const { useAddRelevanceMutation } = apiWithRelevances;
