import { rsApi } from './index';

const queryTemplatesApi = rsApi.injectEndpoints({
  endpoints: (builder) => ({
    getQueryTemplates: builder.query({
      query: () => '/query-templates',
      providesTags: ['QueryTemplates'],
    }),
    addQueryTemplate: builder.mutation({
      query: (body) => ({
        url: '/query-templates',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['QueryTemplates'],
    }),
    deleteQueryTemplate: builder.mutation({
      query(id) {
        return {
          url: `/query-templates/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['QueryTemplates'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetQueryTemplatesQuery,
  useAddQueryTemplateMutation,
  useDeleteQueryTemplateMutation,
} = queryTemplatesApi;
