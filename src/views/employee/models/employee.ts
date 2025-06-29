export interface FormField {
    value: string;
    error?: string;
    touched: boolean;
  }
  
export interface EmployeeFormData {
    firstName: FormField;
    lastName: FormField;
    dateOfEmployment: FormField;
    dateOfBirth: FormField;
    phone: FormField;
    email: FormField;
    department: FormField;
    position: FormField;
  }

export interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    dateOfEmployment: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    department: string;
    position: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type EmployeeFormFieldKeys = keyof EmployeeFormData;

export interface EmployeeFormValidation {
    isValid: boolean;
    errors: Partial<Record<EmployeeFormFieldKeys, string>>;
}

export interface EmployeeFormSubmitDetail {
    data: Record<string, string>;
    isEdit: boolean;
    originalEmployee?: Employee;
    newEmployee?: Employee;
}

export interface EmployeeFormSubmitEvent extends CustomEvent {
    detail: EmployeeFormSubmitDetail;
}

export interface EmployeeOperationResult {
    success: boolean;
    message?: string;
    data?: Employee;
    error?: string;
}

export interface EmployeeFilters {
    department?: string;
    position?: string;
    searchQuery?: string;
}

export interface EmployeePagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

export interface EmployeeListResponse {
    employees: Employee[];
    pagination: EmployeePagination;
    filters: EmployeeFilters;
}

export interface EmployeeFormState {
    formData: EmployeeFormData;
    isSubmitting: boolean;
    isEdit: boolean;
    employee: Employee | undefined;
}

export type EmployeeValidationError = {
    field: EmployeeFormFieldKeys;
    message: string;
};

export enum EmployeeFormMode {
    CREATE = 'create',
    EDIT = 'edit',
    VIEW = 'view'
}

export enum EmployeeStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending'
}

export interface ExtendedEmployee extends Employee {
    status: EmployeeStatus;
    fullName: string;
    age?: number;
    yearsOfService?: number;
}