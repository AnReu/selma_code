let nextQueryTemplateId = 0;
// eslint-disable-next-line import/prefer-default-export
export const addQueryTemplate = (text) => ({
  type: 'ADD_QUERY_TEMPLATE',
  // eslint-disable-next-line no-plusplus
  id: nextQueryTemplateId++,
  text,
});

// export const setVisibilityFilter = (filter) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter,
// });

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id
// })

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE',
// };
