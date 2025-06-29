import { SelectOption } from "@/components/ui/select/select.type";
import { EmployeeFormData } from "./models/employee";

export const departments: SelectOption[] = [
    { value: 'IT', label: 'Information Technology' },
    { value: 'Tasarım', label: 'Design' },
    { value: 'İK', label: 'Human Resources' },
    { value: 'Pazarlama', label: 'Marketing' }
  ];

  export const positions: SelectOption[] = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Senior', label: 'Senior' }
  ];

  export const validateField = (field: keyof EmployeeFormData, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2) return 'First name must be at least 2 characters';
        if (!/^[a-zA-ZğĞıİöÖüÜşŞçÇ\s]+$/.test(value)) return 'First name should only contain letters';
        break;
      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2) return 'Last name must be at least 2 characters';
        if (!/^[a-zA-ZğĞıİöÖüÜşŞçÇ\s]+$/.test(value)) return 'Last name should only contain letters';
        break;
      case 'dateOfEmployment':
        if (!value.trim()) return 'Employment date is required';
        if (new Date(value) > new Date()) return 'Employment date cannot be in the future';
        break;
      case 'dateOfBirth':
        if (!value.trim()) return 'Date of birth is required';
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || age > 70) return 'Age must be between 18-70 years';
        break;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[0-9\s\-\(\)\+]+$/.test(value)) return 'Please enter a valid phone number';
        if (value.replace(/[^0-9]/g, '').length < 10) return 'Phone number must be at least 10 digits';
        break;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        break;
      case 'department':
        if (!value.trim()) return 'Department selection is required';
        break;
      case 'position':
        if (!value.trim()) return 'Position selection is required';
        break;
    }
    return undefined;
  }