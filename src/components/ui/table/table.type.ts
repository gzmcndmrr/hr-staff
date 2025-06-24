export interface TableStaffData {
    id: number;
    firstName: string;
    lastName: string;
    dateOfEmployment: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    department: string;
    position: string;
  }

  export interface TableStaffColumn {
    key: string;
    header: string;
    className?: string;
  }
  