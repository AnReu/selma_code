import {
  configureStore, ThunkAction, Action, combineReducers,
} from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import snackbarReducer from '../features/snackbar/snackbarSlice';
import searchReducer from '../features/search/searchSlice';
import { splitApi } from './services/index';

const rootReducer = combineReducers({
  [splitApi.reducerPath]: splitApi.reducer,
  snackbar: snackbarReducer,
  search: searchReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(splitApi.middleware),
  preloadedState,
});

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
