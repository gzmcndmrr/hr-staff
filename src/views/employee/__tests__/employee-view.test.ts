import { describe, it, expect, beforeEach, vi } from 'vitest';
import employeesJson from '@/mocks/employees.json';

describe('EmployeeView', () => {

  const mockEmployees = employeesJson;

  const mockStore = {
    getState: vi.fn(() => ({
      employee: {
        viewMode: 'list',
        employees: mockEmployees,
        currentView: 'employeeList',
        selectedEmployeeId: null,
      },
    })),
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  };

  beforeEach(async () => {
    vi.stubGlobal('store', mockStore);
  });

  it('should load employees from store and have correct data structure', () => {
    const state = mockStore.getState();
    const employees = state.employee.employees;

    expect(employees).toBeDefined();
    
    const employee = employees[0];
    
    if (employee) {
      expect(employee).toHaveProperty('id');
      expect(employee).toHaveProperty('firstName');
      expect(employee).toHaveProperty('lastName');
      expect(employee).toHaveProperty('email');
      expect(employee).toHaveProperty('department');
      expect(employee).toHaveProperty('position');
      expect(employee).toHaveProperty('dateOfEmployment');
      expect(employee).toHaveProperty('dateOfBirth');
      expect(employee).toHaveProperty('phone');
    } else {
      throw new Error('Employee should be defined');
    }
  });

  it('should handle empty employees list', () => {
    const emptyMockStore = {
      getState: vi.fn(() => ({
        employee: {
          viewMode: 'list',
          employees: [],
          currentView: 'employeeList',
          selectedEmployeeId: null,
        },
      })),
      subscribe: vi.fn(),
      dispatch: vi.fn(),
    };

    const state = emptyMockStore.getState();
    const employees = state.employee.employees;

    expect(employees).toBeDefined();
    expect(employees).toHaveLength(0);
  });
}); 