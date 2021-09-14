import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// initialize an empty api service that we'll inject endpoints into later as needed
export const rsApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  endpoints: () => ({}),
  tagTypes: ['QueryTemplates', 'Models', 'Languages', 'Relevance', 'Files', 'SearchResults'],
});

// // Export the auto-generated hooks for endpoints
// export const {
//   useGetLanguagesQuery,
//   useGetModelsQuery,
// } = rsApi;
