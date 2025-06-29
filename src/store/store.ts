import { configureStore, createSlice } from '@reduxjs/toolkit';
import employeeReducer, { setViewMode, toggleViewMode, showEmployeeList, showAddNew, setCurrentView } from '@/store/slices/employeeSlice';

export type { ViewMode, CurrentView } from '@/store/slices/employeeSlice';
export { setViewMode, toggleViewMode, showEmployeeList, showAddNew, setCurrentView };

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