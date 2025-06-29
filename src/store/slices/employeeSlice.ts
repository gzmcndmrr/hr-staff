import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableStaffData } from '../../components/ui/table/table.type';
import employeesData from '../../mocks/employees.json';

export type ViewMode = 'grid' | 'list';
export type CurrentView = 'employeeList' | 'addNew';

export interface EmployeeState {
  viewMode: ViewMode;
  currentView: CurrentView;
  employees: TableStaffData[];
}

const initialEmployeeState: EmployeeState = {
  viewMode: 'list',
  currentView: 'employeeList',
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
    setCurrentView: (state, action: PayloadAction<CurrentView>) => {
      state.currentView = action.payload;
    },
    showEmployeeList: (state) => {
      state.currentView = 'employeeList';
    },
    showAddNew: (state) => {
      state.currentView = 'addNew';
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

export const { 
  setViewMode, 
  toggleViewMode, 
  setCurrentView,
  showEmployeeList,
  showAddNew,
  addEmployee, 
  updateEmployee, 
  deleteEmployee 
} = employeeSlice.actions;
export default employeeSlice.reducer; 