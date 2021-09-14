import { configureStore } from '@reduxjs/toolkit';
import { rsApi } from './services';
// import { setupListeners } from '@reduxjs/toolkit/query'

// Reducers
const languageReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.payload;
    default:
      return state;
  }
};

const modelReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MODEL':
      return action.payload;
    default:
      return state;
  }
};

// Default initial state
const initialState = {
  language: 'english',
  model: 'PyterrierModel',
};

export default configureStore({
  reducer: {
    language: languageReducer,
    model: modelReducer,
    [rsApi.reducerPath]: rsApi.reducer,
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
