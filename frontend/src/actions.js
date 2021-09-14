const setLanguage = (lang) => ({
  type: 'SET_LANGUAGE',
  payload: lang,
});

const setModel = (model) => ({
  type: 'SET_MODEL',
  payload: model,
});

export default { setLanguage, setModel };
