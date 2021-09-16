const setLanguage = (lang) => ({
  type: 'SET_LANGUAGE',
  payload: lang,
});

const setModel = (model) => ({
  type: 'SET_MODEL',
  payload: model,
});

const setQueryText = (queryText) => ({
  type: 'SET_QUERY_TEXT',
  payload: queryText,
});

export default { setLanguage, setModel, setQueryText };
