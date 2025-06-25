import { TableStaffColumn, TableStaffData } from "./table.type";


export const sampleData: TableStaffData[] = [
    { 
        id: 1, 
        firstName: 'Ahmet', 
        lastName: 'Yılmaz', 
        dateOfEmployment: '2023-01-15',
        dateOfBirth: '1990-05-20',
        phone: '+90 555 123 4567',
        email: 'ahmet.yilmaz@company.com',
        department: 'IT', 
        position: 'Junior'
    },
    { 
        id: 2, 
        firstName: 'Fatma', 
        lastName: 'Kaya', 
        dateOfEmployment: '2022-08-10',
        dateOfBirth: '1985-12-03',
        phone: '+90 555 234 5678',
        email: 'fatma.kaya@company.com',
        department: 'IT', 
        position: 'Middle'
    },
    { 
        id: 3, 
        firstName: 'Mehmet', 
        lastName: 'Demir', 
        dateOfEmployment: '2023-03-22',
        dateOfBirth: '1992-09-15',
        phone: '+90 555 345 6789',
        email: 'mehmet.demir@company.com',
        department: 'Tasarım', 
        position: 'Senior'
    },
    { 
        id: 4, 
        firstName: 'Ayşe', 
        lastName: 'Şahin', 
        dateOfEmployment: '2021-11-05',
        dateOfBirth: '1988-07-28',
        phone: '+90 555 456 7890',
        email: 'ayse.sahin@company.com',
        department: 'İK', 
        position: 'Middle'
    },
    { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    },
    { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    }, { 
        id: 5, 
        firstName: 'Can', 
        lastName: 'Özkan', 
        dateOfEmployment: '2023-06-18',
        dateOfBirth: '1991-02-14',
        phone: '+90 555 567 8901',
        email: 'can.ozkan@company.com',
        department: 'Pazarlama', 
        position: 'Senior'
    },
  ];

export const tableStaffColumns: TableStaffColumn[] = [
  { key: 'firstName', header: 'First Name' },
  { key: 'lastName', header: 'Last Name' },
  { key: 'dateOfEmployment', header: 'Date of Employment' },
  { key: 'dateOfBirth', header: 'Date of Birth' },
  { key: 'phone', header: 'Phone' },
  { key: 'email', header: 'Email' },
  { key: 'department', header: 'Department' },
  { key: 'position', header: 'Position' },
  { key: 'actions', header: 'Actions' }
];

export const headerColumnClass = "px-6 py-3 text-left text-xs font-medium text-orange-500 border-b border-gray-200";

export const DEFAULT_CURRENT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 5;
export const MAX_VISIBLE_PAGES = 5;
