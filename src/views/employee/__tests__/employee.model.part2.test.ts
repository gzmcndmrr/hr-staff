import { describe, it, expect } from 'vitest';
import {
  EmployeeFormSubmitEvent,
  EmployeeOperationResult,
  EmployeeFilters,
  EmployeePagination,
  EmployeeListResponse,
  EmployeeFormState,
  EmployeeValidationError,
  EmployeeFormMode,
  EmployeeStatus,
  ExtendedEmployee,
  Employee,
  EmployeeFormData
} from '../models/employee';

describe('Employee Models - Part 2', () => {
  describe('EmployeeFormSubmitEvent Interface', () => {
    it('should create valid EmployeeFormSubmitEvent', () => {
      const detail = {
        data: { firstName: 'John', lastName: 'Doe' },
        isEdit: false
      };

      const event = new CustomEvent('submit', { detail }) as EmployeeFormSubmitEvent;

      expect(event.detail).toBe(detail);
      expect(event.detail.isEdit).toBe(false);
      expect(event.type).toBe('submit');
    });

    it('should handle edit mode submit event', () => {
      const detail = {
        data: { firstName: 'Jane', lastName: 'Smith' },
        isEdit: true
      };

      const event = new CustomEvent('employeeSubmit', { detail }) as EmployeeFormSubmitEvent;

      expect(event.detail.isEdit).toBe(true);
      expect(event.detail.data.firstName).toBe('Jane');
      expect(event.type).toBe('employeeSubmit');
    });
  });

  describe('EmployeeOperationResult Interface', () => {
    it('should create successful operation result', () => {
      const employee: Employee = {
        firstName: 'Success',
        lastName: 'Test',
        dateOfEmployment: '2023-07-01',
        dateOfBirth: '1992-08-15',
        phone: '+905554445555',
        email: 'success@example.com',
        department: 'QA',
        position: 'Test Engineer'
      };

      const result: EmployeeOperationResult = {
        success: true,
        data: employee,
        message: 'Employee created successfully'
      };

      expect(result.success).toBe(true);
      expect(result.data).toBe(employee);
      expect(result.message).toBe('Employee created successfully');
      expect(result.error).toBeUndefined();
    });

    it('should create error operation result', () => {
      const result: EmployeeOperationResult = {
        success: false,
        error: 'Failed to create employee'
      };

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to create employee');
      expect(result.data).toBeUndefined();
      expect(result.message).toBeUndefined();
    });

    it('should create minimal success result', () => {
      const result: EmployeeOperationResult = {
        success: true
      };

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
      expect(result.message).toBeUndefined();
      expect(result.error).toBeUndefined();
    });
  });

  describe('EmployeeFilters Interface', () => {
    it('should create filters with all properties', () => {
      const filters: EmployeeFilters = {
        department: 'Engineering',
        position: 'Senior Developer',
        searchQuery: 'John Doe'
      };

      expect(filters.department).toBe('Engineering');
      expect(filters.position).toBe('Senior Developer');
      expect(filters.searchQuery).toBe('John Doe');
    });

    it('should create filters with partial properties', () => {
      const filters: EmployeeFilters = {
        department: 'Marketing'
      };

      expect(filters.department).toBe('Marketing');
      expect(filters.position).toBeUndefined();
      expect(filters.searchQuery).toBeUndefined();
    });

    it('should create empty filters', () => {
      const filters: EmployeeFilters = {};

      expect(filters.department).toBeUndefined();
      expect(filters.position).toBeUndefined();
      expect(filters.searchQuery).toBeUndefined();
    });

    it('should handle empty string values', () => {
      const filters: EmployeeFilters = {
        department: '',
        position: '',
        searchQuery: ''
      };

      expect(filters.department).toBe('');
      expect(filters.position).toBe('');
      expect(filters.searchQuery).toBe('');
    });
  });

  describe('EmployeePagination Interface', () => {
    it('should create valid pagination', () => {
      const pagination: EmployeePagination = {
        page: 1,
        pageSize: 10,
        total: 25,
        totalPages: 3
      };

      expect(pagination.page).toBe(1);
      expect(pagination.pageSize).toBe(10);
      expect(pagination.total).toBe(25);
      expect(pagination.totalPages).toBe(3);
    });

    it('should handle first page scenario', () => {
      const pagination: EmployeePagination = {
        page: 1,
        pageSize: 5,
        total: 3,
        totalPages: 1
      };

      expect(pagination.page).toBe(1);
      expect(pagination.totalPages).toBe(1);
      expect(pagination.total).toBeLessThan(pagination.pageSize);
    });

    it('should handle large dataset pagination', () => {
      const pagination: EmployeePagination = {
        page: 15,
        pageSize: 20,
        total: 1000,
        totalPages: 50
      };

      expect(pagination.page).toBe(15);
      expect(pagination.total).toBe(1000);
      expect(pagination.totalPages).toBe(50);
    });

    it('should handle zero results', () => {
      const pagination: EmployeePagination = {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0
      };

      expect(pagination.total).toBe(0);
      expect(pagination.totalPages).toBe(0);
    });
  });

  describe('EmployeeListResponse Interface', () => {
    it('should create complete list response', () => {
      const employees: Employee[] = [
        {
          id: '1',
          firstName: 'Alice',
          lastName: 'Wonder',
          dateOfEmployment: '2023-01-15',
          dateOfBirth: '1991-03-20',
          phone: '+905556667777',
          email: 'alice.wonder@example.com',
          department: 'Design',
          position: 'UX Designer'
        },
        {
          id: '2',
          firstName: 'Bob',
          lastName: 'Builder',
          dateOfEmployment: '2023-02-01',
          dateOfBirth: '1989-07-10',
          phone: '+905558889999',
          email: 'bob.builder@example.com',
          department: 'Engineering',
          position: 'Full Stack Developer'
        }
      ];

      const response: EmployeeListResponse = {
        employees,
        pagination: {
          page: 1,
          pageSize: 10,
          total: 2,
          totalPages: 1
        },
        filters: {
          department: 'Engineering'
        }
      };

      expect(response.employees).toHaveLength(2);
      expect(response.employees[0].firstName).toBe('Alice');
      expect(response.employees[1].department).toBe('Engineering');
      expect(response.pagination.total).toBe(2);
      expect(response.filters.department).toBe('Engineering');
    });

    it('should create empty list response', () => {
      const response: EmployeeListResponse = {
        employees: [],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
          totalPages: 0
        },
        filters: {}
      };

      expect(response.employees).toHaveLength(0);
      expect(response.pagination.total).toBe(0);
      expect(Object.keys(response.filters)).toHaveLength(0);
    });
  });

  describe('EmployeeFormState Interface', () => {
    it('should create form state for new employee', () => {
      const emptyFormData: EmployeeFormData = {
        firstName: { value: '', touched: false },
        lastName: { value: '', touched: false },
        dateOfEmployment: { value: '', touched: false },
        dateOfBirth: { value: '', touched: false },
        phone: { value: '', touched: false },
        email: { value: '', touched: false },
        department: { value: '', touched: false },
        position: { value: '', touched: false }
      };

      const state: EmployeeFormState = {
        formData: emptyFormData,
        isSubmitting: false,
        isEdit: false,
        employee: undefined
      };

      expect(state.isEdit).toBe(false);
      expect(state.isSubmitting).toBe(false);
      expect(state.employee).toBeUndefined();
      expect(state.formData.firstName.value).toBe('');
    });

    it('should create form state for edit mode', () => {
      const employee: Employee = {
        id: '789',
        firstName: 'Edit',
        lastName: 'Mode',
        dateOfEmployment: '2022-12-01',
        dateOfBirth: '1990-06-30',
        phone: '+905551010101',
        email: 'edit.mode@example.com',
        department: 'Operations',
        position: 'Operations Manager'
      };

      const formData: EmployeeFormData = {
        firstName: { value: employee.firstName, touched: true },
        lastName: { value: employee.lastName, touched: true },
        dateOfEmployment: { value: employee.dateOfEmployment, touched: true },
        dateOfBirth: { value: employee.dateOfBirth, touched: true },
        phone: { value: employee.phone, touched: true },
        email: { value: employee.email, touched: true },
        department: { value: employee.department, touched: true },
        position: { value: employee.position, touched: true }
      };

      const state: EmployeeFormState = {
        formData,
        isSubmitting: true,
        isEdit: true,
        employee
      };

      expect(state.isEdit).toBe(true);
      expect(state.isSubmitting).toBe(true);
      expect(state.employee).toBe(employee);
      expect(state.formData.firstName.value).toBe('Edit');
    });
  });

  describe('EmployeeValidationError Type', () => {
    it('should create validation error for each field', () => {
      const firstNameError: EmployeeValidationError = {
        field: 'firstName',
        message: 'First name is required'
      };

      const emailError: EmployeeValidationError = {
        field: 'email',
        message: 'Invalid email format'
      };

      const phoneError: EmployeeValidationError = {
        field: 'phone',
        message: 'Phone number must be valid'
      };

      expect(firstNameError.field).toBe('firstName');
      expect(firstNameError.message).toBe('First name is required');
      expect(emailError.field).toBe('email');
      expect(emailError.message).toBe('Invalid email format');
      expect(phoneError.field).toBe('phone');
      expect(phoneError.message).toBe('Phone number must be valid');
    });

    it('should handle all possible field types', () => {
      const errors: EmployeeValidationError[] = [
        { field: 'firstName', message: 'Required' },
        { field: 'lastName', message: 'Required' },
        { field: 'dateOfEmployment', message: 'Invalid date' },
        { field: 'dateOfBirth', message: 'Invalid date' },
        { field: 'phone', message: 'Invalid format' },
        { field: 'email', message: 'Invalid format' },
        { field: 'department', message: 'Required' },
        { field: 'position', message: 'Required' }
      ];

      expect(errors).toHaveLength(8);
      errors.forEach(error => {
        expect(typeof error.field).toBe('string');
        expect(typeof error.message).toBe('string');
      });
    });
  });

  describe('EmployeeFormMode Enum', () => {
    it('should have correct enum values', () => {
      expect(EmployeeFormMode.CREATE).toBe('create');
      expect(EmployeeFormMode.EDIT).toBe('edit');
      expect(EmployeeFormMode.VIEW).toBe('view');
    });

    it('should have exactly 3 enum values', () => {
      const enumValues = Object.values(EmployeeFormMode);
      expect(enumValues).toHaveLength(3);
      expect(enumValues).toEqual(['create', 'edit', 'view']);
    });

    it('should be usable in conditionals', () => {
      const mode = EmployeeFormMode.CREATE;
      let result = '';

      switch (mode) {
        case EmployeeFormMode.CREATE:
          result = 'Creating new employee';
          break;
        case EmployeeFormMode.EDIT:
          result = 'Editing employee';
          break;
        case EmployeeFormMode.VIEW:
          result = 'Viewing employee';
          break;
        default:
          result = 'Unknown mode';
      }

      expect(result).toBe('Creating new employee');
    });

    it('should compare enum values correctly', () => {
      expect(EmployeeFormMode.CREATE === 'create').toBe(true);
      expect(EmployeeFormMode.EDIT === 'edit').toBe(true);
      expect(EmployeeFormMode.VIEW === 'view').toBe(true);
      expect(EmployeeFormMode.CREATE === EmployeeFormMode.EDIT).toBe(false);
    });
  });

  describe('EmployeeStatus Enum', () => {
    it('should have correct enum values', () => {
      expect(EmployeeStatus.ACTIVE).toBe('active');
      expect(EmployeeStatus.INACTIVE).toBe('inactive');
      expect(EmployeeStatus.PENDING).toBe('pending');
    });

    it('should have exactly 3 enum values', () => {
      const enumValues = Object.values(EmployeeStatus);
      expect(enumValues).toHaveLength(3);
      expect(enumValues).toEqual(['active', 'inactive', 'pending']);
    });

    it('should be usable in filtering logic', () => {
      const statuses = [
        EmployeeStatus.ACTIVE,
        EmployeeStatus.INACTIVE,
        EmployeeStatus.PENDING
      ];

      const activeStatus = statuses.filter(status => status === EmployeeStatus.ACTIVE);
      expect(activeStatus).toHaveLength(1);
      expect(activeStatus[0]).toBe('active');
    });

    it('should validate status values', () => {
      const isValidStatus = (status: string): status is EmployeeStatus => {
        return Object.values(EmployeeStatus).includes(status as EmployeeStatus);
      };

      expect(isValidStatus('active')).toBe(true);
      expect(isValidStatus('inactive')).toBe(true);
      expect(isValidStatus('pending')).toBe(true);
      expect(isValidStatus('unknown')).toBe(false);
      expect(isValidStatus('')).toBe(false);
    });
  });

  describe('ExtendedEmployee Interface', () => {
    it('should extend Employee with additional properties', () => {
      const baseEmployee: Employee = {
        id: '999',
        firstName: 'Extended',
        lastName: 'Employee',
        dateOfEmployment: '2021-01-01',
        dateOfBirth: '1985-05-15',
        phone: '+905559999999',
        email: 'extended@example.com',
        department: 'Executive',
        position: 'CEO'
      };

      const extendedEmployee: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.ACTIVE,
        fullName: 'Extended Employee',
        age: 38,
        yearsOfService: 3
      };

      expect(extendedEmployee.id).toBe('999');
      expect(extendedEmployee.firstName).toBe('Extended');
      expect(extendedEmployee.lastName).toBe('Employee');
      expect(extendedEmployee.status).toBe(EmployeeStatus.ACTIVE);
      expect(extendedEmployee.fullName).toBe('Extended Employee');
      expect(extendedEmployee.age).toBe(38);
      expect(extendedEmployee.yearsOfService).toBe(3);
    });

    it('should handle optional properties in ExtendedEmployee', () => {
      const baseEmployee: Employee = {
        firstName: 'Simple',
        lastName: 'Extended',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1995-01-01',
        phone: '+905551234567',
        email: 'simple@example.com',
        department: 'IT',
        position: 'Junior Developer'
      };

      const extendedEmployee: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.PENDING,
        fullName: 'Simple Extended'
        // age and yearsOfService are optional and not provided
      };

      expect(extendedEmployee.status).toBe(EmployeeStatus.PENDING);
      expect(extendedEmployee.fullName).toBe('Simple Extended');
      expect(extendedEmployee.age).toBeUndefined();
      expect(extendedEmployee.yearsOfService).toBeUndefined();
    });

    it('should work with all status types', () => {
      const baseEmployee: Employee = {
        firstName: 'Status',
        lastName: 'Test',
        dateOfEmployment: '2022-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+905551111111',
        email: 'status@example.com',
        department: 'HR',
        position: 'HR Specialist'
      };

      const activeEmployee: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.ACTIVE,
        fullName: 'Status Test'
      };

      const inactiveEmployee: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.INACTIVE,
        fullName: 'Status Test'
      };

      const pendingEmployee: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.PENDING,
        fullName: 'Status Test'
      };

      expect(activeEmployee.status).toBe('active');
      expect(inactiveEmployee.status).toBe('inactive');
      expect(pendingEmployee.status).toBe('pending');
    });
  });

  describe('Model Integration Tests', () => {
    it('should work with all models together', () => {
      // Create a complete employee
      const employee: Employee = {
        id: 'integration-test',
        firstName: 'Integration',
        lastName: 'Test',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+905551234567',
        email: 'integration@example.com',
        department: 'QA',
        position: 'QA Engineer'
      };

      // Create extended employee
      const extendedEmployee: ExtendedEmployee = {
        ...employee,
        status: EmployeeStatus.ACTIVE,
        fullName: `${employee.firstName} ${employee.lastName}`,
        age: 33,
        yearsOfService: 1
      };

      // Create operation result
      const operationResult: EmployeeOperationResult = {
        success: true,
        data: employee,
        message: 'Employee processed successfully'
      };

      // Create filters
      const filters: EmployeeFilters = {
        department: employee.department,
        searchQuery: employee.firstName
      };

      // Create pagination
      const pagination: EmployeePagination = {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1
      };

      // Create list response
      const listResponse: EmployeeListResponse = {
        employees: [employee],
        pagination,
        filters
      };

      // Create validation error
      const validationError: EmployeeValidationError = {
        field: 'email',
        message: 'Email already exists'
      };

      // Verify all objects are properly created
      expect(employee.id).toBe('integration-test');
      expect(extendedEmployee.fullName).toBe('Integration Test');
      expect(operationResult.success).toBe(true);
      expect(filters.department).toBe('QA');
      expect(pagination.total).toBe(1);
      expect(listResponse.employees).toHaveLength(1);
      expect(validationError.field).toBe('email');
    });
  });
}); 