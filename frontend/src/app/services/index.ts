import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Languages', 'Models', 'Results', 'Templates', 'Relevances', 'Configs', 'Databases'],
  endpoints: () => ({}),
});

export const splitApi = emptySplitApi;
