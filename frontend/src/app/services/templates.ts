import { emptySplitApi } from '.';

export interface Template {
  id?: number;
  name: string;
  model: string;
  mode: string;
  language: string;
  text: string;
  code: string;
  equation: string;
  url: string;
  user: string;
  database: string;
}

export const emptyTemplate: Template = {
  name: '',
  text: '',
  code: '',
  equation: '',
  mode: 'default',
  model: '',
  language: '',
  url: '',
  user: 'homer',
  database: '',
};

type TemplatesResponse = Template[];

const apiWithTemplates = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getTemplates: build.query<TemplatesResponse, void>({
      query: () => '/query-templates',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Templates' as const, id })), 'Templates']
        : ['Templates']),
    }),
    addTemplate: build.mutation<Template, Partial<Template>>({
      query(body) {
        return {
          url: '/query-templates',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Templates'],
    }),
    deleteTemplate: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/query-templates/${id}`,
          method: 'DELETE',
        };
      },
      // Invalidates all queries that subscribe to this Template `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Templates', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
} = apiWithTemplates;
