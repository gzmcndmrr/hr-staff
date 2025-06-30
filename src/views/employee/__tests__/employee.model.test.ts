import { describe, it, expect } from 'vitest';
import {
  FormField,
  EmployeeFormData,
  Employee,
  EmployeeFormFieldKeys,
  EmployeeFormValidation,
  EmployeeFormSubmitDetail,
  EmployeeOperationResult,
  EmployeeFilters,
  EmployeePagination,
  EmployeeListResponse,
  EmployeeFormState,
  EmployeeValidationError,
  EmployeeFormMode,
  EmployeeStatus,
  ExtendedEmployee
} from '../models/employee';

export const isFormField = (obj: any): obj is FormField => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.value === 'string' &&
    typeof obj.touched === 'boolean' &&
    (obj.error === undefined || typeof obj.error === 'string')
  );
};

export const isEmployee = (obj: any): obj is Employee => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.firstName === 'string' &&
    typeof obj.lastName === 'string' &&
    typeof obj.dateOfEmployment === 'string' &&
    typeof obj.dateOfBirth === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.department === 'string' &&
    typeof obj.position === 'string' &&
    (obj.id === undefined || typeof obj.id === 'string') &&
    (obj.createdAt === undefined || obj.createdAt instanceof Date) &&
    (obj.updatedAt === undefined || obj.updatedAt instanceof Date)
  );
};

export const isEmployeeFormData = (obj: any): obj is EmployeeFormData => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    isFormField(obj.firstName) &&
    isFormField(obj.lastName) &&
    isFormField(obj.dateOfEmployment) &&
    isFormField(obj.dateOfBirth) &&
    isFormField(obj.phone) &&
    isFormField(obj.email) &&
    isFormField(obj.department) &&
    isFormField(obj.position)
  );
};

export const isEmployeeFormValidation = (obj: any): obj is EmployeeFormValidation => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.isValid === 'boolean' &&
    typeof obj.errors === 'object'
  );
};

export const isEmployeeOperationResult = (obj: any): obj is EmployeeOperationResult => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.success === 'boolean' &&
    (obj.message === undefined || typeof obj.message === 'string') &&
    (obj.data === undefined || isEmployee(obj.data)) &&
    (obj.error === undefined || typeof obj.error === 'string')
  );
};

export const isEmployeePagination = (obj: any): obj is EmployeePagination => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.page === 'number' &&
    typeof obj.pageSize === 'number' &&
    typeof obj.total === 'number' &&
    typeof obj.totalPages === 'number'
  );
};

export const isEmployeeFilters = (obj: any): obj is EmployeeFilters => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.department === undefined || typeof obj.department === 'string') &&
    (obj.position === undefined || typeof obj.position === 'string') &&
    (obj.searchQuery === undefined || typeof obj.searchQuery === 'string')
  );
};

export const isExtendedEmployee = (obj: any): obj is ExtendedEmployee => {
  return (
    isEmployee(obj) &&
    Object.values(EmployeeStatus).includes((obj as any).status) &&
    typeof (obj as any).fullName === 'string' &&
    ((obj as any).age === undefined || typeof (obj as any).age === 'number') &&
    ((obj as any).yearsOfService === undefined || typeof (obj as any).yearsOfService === 'number')
  );
};

export const createEmptyFormField = (): FormField => ({
  value: '',
  touched: false
});

export const createFormFieldWithValue = (value: string, touched = false, error?: string): FormField => ({
  value,
  touched,
  ...(error !== undefined && { error })
});

export const createEmptyEmployeeFormData = (): EmployeeFormData => ({
  firstName: createEmptyFormField(),
  lastName: createEmptyFormField(),
  dateOfEmployment: createEmptyFormField(),
  dateOfBirth: createEmptyFormField(),
  phone: createEmptyFormField(),
  email: createEmptyFormField(),
  department: createEmptyFormField(),
  position: createEmptyFormField()
});

export const employeeToFormData = (employee: Employee): EmployeeFormData => ({
  firstName: createFormFieldWithValue(employee.firstName),
  lastName: createFormFieldWithValue(employee.lastName),
  dateOfEmployment: createFormFieldWithValue(employee.dateOfEmployment),
  dateOfBirth: createFormFieldWithValue(employee.dateOfBirth),
  phone: createFormFieldWithValue(employee.phone),
  email: createFormFieldWithValue(employee.email),
  department: createFormFieldWithValue(employee.department),
  position: createFormFieldWithValue(employee.position)
});

export const formDataToEmployee = (formData: EmployeeFormData, id?: string): Employee => ({
  ...(id && { id }),
  firstName: formData.firstName.value,
  lastName: formData.lastName.value,
  dateOfEmployment: formData.dateOfEmployment.value,
  dateOfBirth: formData.dateOfBirth.value,
  phone: formData.phone.value,
  email: formData.email.value,
  department: formData.department.value,
  position: formData.position.value
});

export const extendEmployee = (employee: Employee): ExtendedEmployee => {
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const birthDate = new Date(employee.dateOfBirth);
  const employmentDate = new Date(employee.dateOfEmployment);
  const now = new Date();
  
  const age = now.getFullYear() - birthDate.getFullYear();
  const yearsOfService = now.getFullYear() - employmentDate.getFullYear();

  return {
    ...employee,
    status: EmployeeStatus.ACTIVE,
    fullName,
    ...(age >= 0 && { age }),
    ...(yearsOfService >= 0 && { yearsOfService })
  };
};

export const createSuccessResult = (data: Employee, message?: string): EmployeeOperationResult => ({
  success: true,
  data,
  ...(message !== undefined && { message })
});

export const createErrorResult = (error: string): EmployeeOperationResult => ({
  success: false,
  error
});

describe('Employee Models', () => {
  describe('FormField Interface', () => {
    it('should create valid FormField with all properties', () => {
      const formField: FormField = {
        value: 'test value',
        touched: true,
        error: 'Test error message'
      };

      expect(formField.value).toBe('test value');
      expect(formField.touched).toBe(true);
      expect(formField.error).toBe('Test error message');
    });

    it('should create FormField without optional error property', () => {
      const formField: FormField = {
        value: 'another test',
        touched: false
      };

      expect(formField.value).toBe('another test');
      expect(formField.touched).toBe(false);
      expect(formField.error).toBeUndefined();
    });

    it('should handle empty string value', () => {
      const formField: FormField = {
        value: '',
        touched: true
      };

      expect(formField.value).toBe('');
      expect(formField.touched).toBe(true);
      expect(formField.error).toBeUndefined();
    });
  });

  describe('Employee Interface', () => {
    it('should create Employee with all required fields', () => {
      const employee: Employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+905551234567',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Senior Developer'
      };

      expect(employee.firstName).toBe('John');
      expect(employee.lastName).toBe('Doe');
      expect(employee.dateOfEmployment).toBe('2023-01-01');
      expect(employee.dateOfBirth).toBe('1990-01-01');
      expect(employee.phone).toBe('+905551234567');
      expect(employee.email).toBe('john.doe@example.com');
      expect(employee.department).toBe('Engineering');
      expect(employee.position).toBe('Senior Developer');
    });

    it('should create Employee with optional fields', () => {
      const now = new Date();
      const employee: Employee = {
        id: '123',
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2023-02-15',
        dateOfBirth: '1992-05-10',
        phone: '+905559876543',
        email: 'jane.smith@example.com',
        department: 'Product',
        position: 'Product Manager',
        createdAt: now,
        updatedAt: now
      };

      expect(employee.id).toBe('123');
      expect(employee.createdAt).toBe(now);
      expect(employee.updatedAt).toBe(now);
    });

    it('should handle undefined optional fields', () => {
      const employee: Employee = {
        firstName: 'Bob',
        lastName: 'Wilson',
        dateOfEmployment: '2023-03-01',
        dateOfBirth: '1988-12-25',
        phone: '+905551119999',
        email: 'bob.wilson@example.com',
        department: 'Marketing',
        position: 'Marketing Specialist'
      };

      expect(employee.id).toBeUndefined();
      expect(employee.createdAt).toBeUndefined();
      expect(employee.updatedAt).toBeUndefined();
    });
  });

  describe('EmployeeFormData Interface', () => {
    it('should create valid EmployeeFormData with all fields', () => {
      const formData: EmployeeFormData = {
        firstName: { value: 'Alice', touched: true },
        lastName: { value: 'Johnson', touched: true },
        dateOfEmployment: { value: '2023-04-01', touched: true },
        dateOfBirth: { value: '1991-07-15', touched: true },
        phone: { value: '+905552221111', touched: true },
        email: { value: 'alice.johnson@example.com', touched: true },
        department: { value: 'Design', touched: true },
        position: { value: 'UI/UX Designer', touched: true }
      };

      expect(formData.firstName.value).toBe('Alice');
      expect(formData.lastName.value).toBe('Johnson');
      expect(formData.dateOfEmployment.value).toBe('2023-04-01');
      expect(formData.dateOfBirth.value).toBe('1991-07-15');
      expect(formData.phone.value).toBe('+905552221111');
      expect(formData.email.value).toBe('alice.johnson@example.com');
      expect(formData.department.value).toBe('Design');
      expect(formData.position.value).toBe('UI/UX Designer');
    });

    it('should create EmployeeFormData with errors', () => {
      const formData: EmployeeFormData = {
        firstName: { value: '', touched: true, error: 'First name is required' },
        lastName: { value: '', touched: true, error: 'Last name is required' },
        dateOfEmployment: { value: '2023-05-01', touched: true },
        dateOfBirth: { value: '1989-03-20', touched: true },
        phone: { value: 'invalid', touched: true, error: 'Invalid phone format' },
        email: { value: 'invalid-email', touched: true, error: 'Invalid email format' },
        department: { value: 'HR', touched: true },
        position: { value: 'HR Manager', touched: true }
      };

      expect(formData.firstName.error).toBe('First name is required');
      expect(formData.lastName.error).toBe('Last name is required');
      expect(formData.phone.error).toBe('Invalid phone format');
      expect(formData.email.error).toBe('Invalid email format');
      expect(formData.dateOfEmployment.error).toBeUndefined();
      expect(formData.department.error).toBeUndefined();
    });
  });

  describe('EmployeeFormFieldKeys Type', () => {
    it('should include all form field keys', () => {
      const keys: EmployeeFormFieldKeys[] = [
        'firstName',
        'lastName',
        'dateOfEmployment',
        'dateOfBirth',
        'phone',
        'email',
        'department',
        'position'
      ];

      expect(keys).toHaveLength(8);
      expect(keys).toContain('firstName');
      expect(keys).toContain('lastName');
      expect(keys).toContain('dateOfEmployment');
      expect(keys).toContain('dateOfBirth');
      expect(keys).toContain('phone');
      expect(keys).toContain('email');
      expect(keys).toContain('department');
      expect(keys).toContain('position');
    });
  });

  describe('EmployeeFormValidation Interface', () => {
    it('should create valid form validation', () => {
      const validation: EmployeeFormValidation = {
        isValid: true,
        errors: {}
      };

      expect(validation.isValid).toBe(true);
      expect(Object.keys(validation.errors)).toHaveLength(0);
    });

    it('should create form validation with errors', () => {
      const validation: EmployeeFormValidation = {
        isValid: false,
        errors: {
          firstName: 'First name is required',
          email: 'Invalid email format',
          phone: 'Phone number is required'
        }
      };

      expect(validation.isValid).toBe(false);
      expect(validation.errors.firstName).toBe('First name is required');
      expect(validation.errors.email).toBe('Invalid email format');
      expect(validation.errors.phone).toBe('Phone number is required');
      expect(validation.errors.lastName).toBeUndefined();
    });

    it('should handle partial error object', () => {
      const validation: EmployeeFormValidation = {
        isValid: false,
        errors: {
          department: 'Department is required'
        }
      };

      expect(validation.isValid).toBe(false);
      expect(validation.errors.department).toBe('Department is required');
      expect(Object.keys(validation.errors)).toHaveLength(1);
    });
  });

  describe('EmployeeFormSubmitDetail Interface', () => {
    it('should create submit detail for new employee', () => {
      const newEmployee: Employee = {
        firstName: 'Tom',
        lastName: 'Brown',
        dateOfEmployment: '2023-06-01',
        dateOfBirth: '1993-11-05',
        phone: '+905553334444',
        email: 'tom.brown@example.com',
        department: 'Sales',
        position: 'Sales Representative'
      };

      const submitDetail: EmployeeFormSubmitDetail = {
        data: {
          firstName: 'Tom',
          lastName: 'Brown',
          email: 'tom.brown@example.com'
        },
        isEdit: false,
        newEmployee
      };

      expect(submitDetail.isEdit).toBe(false);
      expect(submitDetail.newEmployee).toBe(newEmployee);
      expect(submitDetail.originalEmployee).toBeUndefined();
      expect(submitDetail.data['firstName']).toBe('Tom');
    });

    it('should create submit detail for employee edit', () => {
      const originalEmployee: Employee = {
        id: '456',
        firstName: 'Original',
        lastName: 'Name',
        dateOfEmployment: '2022-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+905550000000',
        email: 'original@example.com',
        department: 'IT',
        position: 'Developer'
      };

      const updatedEmployee: Employee = {
        ...originalEmployee,
        firstName: 'Updated',
        lastName: 'Name'
      };

      const submitDetail: EmployeeFormSubmitDetail = {
        data: {
          firstName: 'Updated',
          lastName: 'Name'
        },
        isEdit: true,
        originalEmployee,
        newEmployee: updatedEmployee
      };

      expect(submitDetail.isEdit).toBe(true);
      expect(submitDetail.originalEmployee).toBe(originalEmployee);
      expect(submitDetail.newEmployee).toBe(updatedEmployee);
      expect(submitDetail.originalEmployee?.firstName).toBe('Original');
      expect(submitDetail.newEmployee?.firstName).toBe('Updated');
    });
  });

  describe('EmployeeOperationResult Interface', () => {
    it('should create successful EmployeeOperationResult', () => {
      const employee: Employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      };

      const result = createSuccessResult(employee, 'Employee created successfully');

      expect(isEmployeeOperationResult(result)).toBe(true);
      expect(result.success).toBe(true);
      expect(result.data).toBe(employee);
      expect(result.message).toBe('Employee created successfully');
      expect(result.error).toBeUndefined();
    });

    it('should create error EmployeeOperationResult', () => {
      const result = createErrorResult('Failed to create employee');

      expect(isEmployeeOperationResult(result)).toBe(true);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to create employee');
      expect(result.data).toBeUndefined();
      expect(result.message).toBeUndefined();
    });
  });

  describe('EmployeeFilters Interface', () => {
    it('should create valid EmployeeFilters', () => {
      const filters: EmployeeFilters = {
        department: 'Engineering',
        position: 'Developer',
        searchQuery: 'John'
      };

      expect(isEmployeeFilters(filters)).toBe(true);
      expect(filters.department).toBe('Engineering');
      expect(filters.position).toBe('Developer');
      expect(filters.searchQuery).toBe('John');
    });

    it('should create empty EmployeeFilters', () => {
      const filters: EmployeeFilters = {};

      expect(isEmployeeFilters(filters)).toBe(true);
      expect(filters.department).toBeUndefined();
      expect(filters.position).toBeUndefined();
      expect(filters.searchQuery).toBeUndefined();
    });

    it('should validate EmployeeFilters type guard', () => {
      expect(isEmployeeFilters({})).toBe(true);
      expect(isEmployeeFilters({ department: 'Engineering' })).toBe(true);
      expect(isEmployeeFilters({ department: 123 })).toBe(false);
      expect(isEmployeeFilters(null)).toBe(false);
    });
  });

  describe('EmployeePagination Interface', () => {
    it('should create valid EmployeePagination', () => {
      const pagination: EmployeePagination = {
        page: 1,
        pageSize: 10,
        total: 25,
        totalPages: 3
      };

      expect(isEmployeePagination(pagination)).toBe(true);
      expect(pagination.page).toBe(1);
      expect(pagination.pageSize).toBe(10);
      expect(pagination.total).toBe(25);
      expect(pagination.totalPages).toBe(3);
    });

    it('should validate EmployeePagination type guard', () => {
      const valid = { page: 1, pageSize: 10, total: 25, totalPages: 3 };
      expect(isEmployeePagination(valid)).toBe(true);
      expect(isEmployeePagination({ ...valid, page: '1' })).toBe(false);
      expect(isEmployeePagination({ ...valid, pageSize: undefined })).toBe(false);
    });
  });

  describe('EmployeeListResponse Interface', () => {
    it('should create valid EmployeeListResponse', () => {
      const employees: Employee[] = [
        {
          firstName: 'John',
          lastName: 'Doe',
          dateOfEmployment: '2023-01-01',
          dateOfBirth: '1990-01-01',
          phone: '+1234567890',
          email: 'john.doe@example.com',
          department: 'Engineering',
          position: 'Developer'
        }
      ];

      const response: EmployeeListResponse = {
        employees,
        pagination: {
          page: 1,
          pageSize: 10,
          total: 1,
          totalPages: 1
        },
        filters: {}
      };

      expect(response.employees).toHaveLength(1);
      expect(response.pagination.total).toBe(1);
      expect(response.filters).toEqual({});
    });
  });

  describe('EmployeeFormState Interface', () => {
    it('should create valid EmployeeFormState for new employee', () => {
      const state: EmployeeFormState = {
        formData: createEmptyEmployeeFormData(),
        isSubmitting: false,
        isEdit: false,
        employee: undefined
      };

      expect(state.isEdit).toBe(false);
      expect(state.isSubmitting).toBe(false);
      expect(state.employee).toBeUndefined();
      expect(isEmployeeFormData(state.formData)).toBe(true);
    });

    it('should create valid EmployeeFormState for edit', () => {
      const employee: Employee = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      };

      const state: EmployeeFormState = {
        formData: employeeToFormData(employee),
        isSubmitting: true,
        isEdit: true,
        employee
      };

      expect(state.isEdit).toBe(true);
      expect(state.isSubmitting).toBe(true);
      expect(state.employee).toBe(employee);
    });
  });

  describe('EmployeeValidationError Type', () => {
    it('should create valid EmployeeValidationError', () => {
      const error: EmployeeValidationError = {
        field: 'firstName',
        message: 'First name is required'
      };

      expect(error.field).toBe('firstName');
      expect(error.message).toBe('First name is required');
    });

    it('should accept all valid field keys', () => {
      const fields: EmployeeFormFieldKeys[] = [
        'firstName',
        'lastName',
        'dateOfEmployment',
        'dateOfBirth',
        'phone',
        'email',
        'department',
        'position'
      ];

      fields.forEach(field => {
        const error: EmployeeValidationError = {
          field,
          message: `${field} is invalid`
        };
        expect(error.field).toBe(field);
      });
    });
  });

  describe('EmployeeFormMode Enum', () => {
    it('should have correct enum values', () => {
      expect(EmployeeFormMode.CREATE).toBe('create');
      expect(EmployeeFormMode.EDIT).toBe('edit');
      expect(EmployeeFormMode.VIEW).toBe('view');
    });

    it('should have exactly 3 values', () => {
      const values = Object.values(EmployeeFormMode);
      expect(values).toHaveLength(3);
      expect(values).toContain('create');
      expect(values).toContain('edit');
      expect(values).toContain('view');
    });
  });

  describe('EmployeeStatus Enum', () => {
    it('should have correct enum values', () => {
      expect(EmployeeStatus.ACTIVE).toBe('active');
      expect(EmployeeStatus.INACTIVE).toBe('inactive');
      expect(EmployeeStatus.PENDING).toBe('pending');
    });

    it('should have exactly 3 values', () => {
      const values = Object.values(EmployeeStatus);
      expect(values).toHaveLength(3);
      expect(values).toContain('active');
      expect(values).toContain('inactive');
      expect(values).toContain('pending');
    });
  });

  describe('ExtendedEmployee Interface', () => {
    it('should create valid ExtendedEmployee', () => {
      const employee: Employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      };

      const extended = extendEmployee(employee);

      expect(isExtendedEmployee(extended)).toBe(true);
      expect(extended.fullName).toBe('John Doe');
      expect(extended.status).toBe(EmployeeStatus.ACTIVE);
      expect(typeof extended.age).toBe('number');
      expect(typeof extended.yearsOfService).toBe('number');
    });

    it('should calculate correct age and years of service', () => {
      const currentYear = new Date().getFullYear();
      const employee: Employee = {
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '2021-01-01',
        dateOfBirth: '1995-01-01',
        phone: '+1234567891',
        email: 'jane.smith@example.com',
        department: 'Marketing',
        position: 'Manager'
      };

      const extended = extendEmployee(employee);

      expect(extended.age).toBe(currentYear - 1995);
      expect(extended.yearsOfService).toBe(currentYear - 2021);
    });

    it('should validate ExtendedEmployee type guard', () => {
      const baseEmployee: Employee = {
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2020-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      };

      const extended: ExtendedEmployee = {
        ...baseEmployee,
        status: EmployeeStatus.ACTIVE,
        fullName: 'John Doe',
        age: 33,
        yearsOfService: 4
      };

      expect(isExtendedEmployee(extended)).toBe(true);
      expect(isExtendedEmployee({ ...extended, status: 'invalid' })).toBe(false);
      expect(isExtendedEmployee({ ...extended, fullName: 123 })).toBe(false);
    });
  });

  describe('Utility Functions', () => {
    it('should create empty FormField', () => {
      const field = createEmptyFormField();
      expect(field.value).toBe('');
      expect(field.touched).toBe(false);
      expect(field.error).toBeUndefined();
    });

    it('should create FormField with value', () => {
      const field = createFormFieldWithValue('test', true, 'error');
      expect(field.value).toBe('test');
      expect(field.touched).toBe(true);
      expect(field.error).toBe('error');
    });

    it('should create FormField with defaults', () => {
      const field = createFormFieldWithValue('test');
      expect(field.value).toBe('test');
      expect(field.touched).toBe(false);
      expect(field.error).toBeUndefined();
    });
  });

  describe('Type Compatibility', () => {
    it('should ensure EmployeeFormFieldKeys includes all form fields', () => {
      const formData = createEmptyEmployeeFormData();
      const keys: EmployeeFormFieldKeys[] = Object.keys(formData) as EmployeeFormFieldKeys[];
      
      expect(keys).toContain('firstName');
      expect(keys).toContain('lastName');
      expect(keys).toContain('dateOfEmployment');
      expect(keys).toContain('dateOfBirth');
      expect(keys).toContain('phone');
      expect(keys).toContain('email');
      expect(keys).toContain('department');
      expect(keys).toContain('position');
    });

    it('should ensure all interfaces work together', () => {
      const employee: Employee = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '2023-01-01',
        dateOfBirth: '1990-01-01',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        department: 'Engineering',
        position: 'Developer'
      };

      const formData = employeeToFormData(employee);
      const convertedBack = formDataToEmployee(formData, employee.id);
      const extended = extendEmployee(employee);
      const result = createSuccessResult(employee);
      const validation: EmployeeFormValidation = { isValid: true, errors: {} };
      const filters: EmployeeFilters = { department: 'Engineering' };
      const pagination: EmployeePagination = { page: 1, pageSize: 10, total: 1, totalPages: 1 };

      expect(isEmployee(convertedBack)).toBe(true);
      expect(isExtendedEmployee(extended)).toBe(true);
      expect(isEmployeeOperationResult(result)).toBe(true);
      expect(isEmployeeFormValidation(validation)).toBe(true);
      expect(isEmployeeFilters(filters)).toBe(true);
      expect(isEmployeePagination(pagination)).toBe(true);
    });
  });
}); 