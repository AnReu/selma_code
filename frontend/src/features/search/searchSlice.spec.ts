import searchReducer, {
  SearchState,
  setURL,
  setFile,
  setLanguage,
  setModel,
  setText,
  setCode,
  setEquation,
  setMode,
  setParams,
} from './searchSlice';

describe('counter reducer', () => {
  const initialState: SearchState = {
    language: 'portuguese',
    model: 'mymodel',
    mode: 'default',
    text: 'random text',
    code: 'random Code',
    equation: 'random Eq',
    url: 'randomIDorURL',
    file: 'randomFile',
    params: null,
    exchange: 'random exchange',
    db: 'someDbName',
  };

  it('should handle setURL', () => {
    const url = 'https://tud.de';
    const actual = searchReducer(initialState, setURL(url));
    expect(actual.url).toEqual(url);
  });

  it('should handle setFile', () => {
    const file = 'TODO';
    const actual = searchReducer(initialState, setFile(file));
    expect(actual.file).toEqual(file);
  });

  it('should handle setLanguage', () => {
    const lang = 'spanish';
    const actual = searchReducer(initialState, setLanguage(lang));
    expect(actual.language).toEqual(lang);
  });

  it('should handle setModel', () => {
    const model = 'pyterrier';
    const actual = searchReducer(initialState, setModel(model));
    expect(actual.model).toEqual(model);
  });

  it('should handle setText', () => {
    const text = 'how to filter array';
    const actual = searchReducer(initialState, setText(text));
    expect(actual.text).toEqual(text);
  });

  it('should handle setCode', () => {
    const code = 'const x: number = 33;';
    const actual = searchReducer(initialState, setCode(code));
    expect(actual.code).toEqual(code);
  });

  it('should handle setEquation', () => {
    const equation = 'x=12+3';
    const actual = searchReducer(initialState, setEquation(equation));
    expect(actual.equation).toEqual(equation);
  });

  it('should handle setMode', () => {
    const mode = 'file';
    const actual = searchReducer(initialState, setMode(mode));
    expect(actual.mode).toEqual(mode);
  });

  it('should handle setParams for mode="default"', () => {
    const state: SearchState = {
      language: 'italian',
      model: 'pyterrier',
      mode: 'default',
      text: 'what is an integer?',
      code: 'random Code',
      equation: 'random Eq',
      url: 'randomIDorURL',
      file: 'randomFile',
      params: null,
      exchange: 'random exchange',
      db: 'someDbName',
    };
    const expectedParams = `text=${state.text}&model=${state.model}&`
    + `model-language=${state.language}&`
    + `db=${state.db}`;
    const actual = searchReducer(state, setParams());
    expect(actual.params).toEqual(expectedParams);
  });

  it('should handle setParams for mode="separated"', () => {
    const state: SearchState = {
      language: 'italian',
      model: 'pyterrier',
      mode: 'separated',
      text: 'what is an integer?',
      code: 'random Code',
      equation: 'random Eq',
      url: 'randomIDorURL',
      file: 'randomFile',
      params: null,
      exchange: 'random exchange',
      db: 'someDbName',
    };
    const expectedParams = `code=${state.code}&`
    + `equations=${state.equation}&`
    + `model=${state.model}&`
    + `model-language=${state.language}&`
    + `db=${state.db}`;
    const actual = searchReducer(state, setParams());
    expect(actual.params).toEqual(expectedParams);
  });

  it('should handle setParams for mode="url"', () => {
    const state: SearchState = {
      language: 'italian',
      model: 'pyterrier',
      mode: 'url',
      text: 'what is an integer?',
      code: 'random Code',
      equation: 'random Eq',
      url: 'randomIDorURL',
      file: 'randomFile',
      params: null,
      exchange: 'randomExchange',
      db: 'someDbName',
    };
    const expectedParams = `id=${state.url}&`
    + `exchange=${state.exchange}&`
    + `model=${state.model}&`
    + `model-language=${state.language}`
    + `db=${state.db}`;
    const actual = searchReducer(state, setParams());
    expect(actual.params).toEqual(expectedParams);
  });
});
