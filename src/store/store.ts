import { configureStore, createSlice } from '@reduxjs/toolkit';
import employeeReducer, { setViewMode, toggleViewMode } from '@/store/slices/employeeSlice';

export type { ViewMode } from '@/store/slices/employeeSlice';
export { setViewMode, toggleViewMode };

const placeholderSlice = createSlice({
  name: 'placeholder',
  initialState: {},
  reducers: {}
});

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    placeholder: placeholderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 