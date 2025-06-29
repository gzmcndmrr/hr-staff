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