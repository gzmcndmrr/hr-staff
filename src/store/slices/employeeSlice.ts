import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableStaffData } from '../../components/ui/table/table.type';
import employeesData from '../../mocks/employees.json';

export type ViewMode = 'grid' | 'list';

export interface EmployeeState {
  viewMode: ViewMode;
  employees: TableStaffData[];
}

const initialEmployeeState: EmployeeState = {
  viewMode: 'list',
  employees: employeesData as TableStaffData[]
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState: initialEmployeeState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
    addEmployee: (state, action: PayloadAction<TableStaffData>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<TableStaffData>) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
    }
  }
});

export const { setViewMode, toggleViewMode, addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer; 