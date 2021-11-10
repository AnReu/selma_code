import snackbarReducer, {
  SnackbarState,
  setSnackbarText,
  toggleSnackbar,
} from './snackbarSlice';

describe('counter reducer', () => {
  const initialState: SnackbarState = {
    time: 3000,
    text: 'initial text',
    open: false,
  };

  it('should handle setText', () => {
    const actual = snackbarReducer(initialState, setSnackbarText('forest'));
    expect(actual.text).toEqual('forest');
  });

  it('should handle setOpen', () => {
    const actual = snackbarReducer(initialState, toggleSnackbar(true));
    expect(actual.open).toEqual(true);
  });
});
