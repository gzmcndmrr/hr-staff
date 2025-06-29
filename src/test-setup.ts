import { vi } from 'vitest';

export const testEmployeeFormData = {
  addNew: {
    firstName: 'Gizem',
    lastName: 'Candemir',
    dateOfEmployment: '2023-01-01',
    dateOfBirth: '1993-04-01',
    phone: '+905551112233',
    email: 'gizem@example.com',
    department: 'Engineering',
    position: 'Staff Frontend Engineer'
  },
  
  update: {
    firstName: 'Updated Gizem',
    lastName: 'Updated Candemir',
    dateOfEmployment: '2023-02-01',
    dateOfBirth: '1993-04-01',
    phone: '+905551112244',
    email: 'updated.gizem@example.com',
    department: 'Product',
    position: 'Senior Frontend Engineer'
  },
  
  withoutId: {
    firstName: 'Test',
    lastName: 'User',
    dateOfEmployment: '2023-01-01',
    dateOfBirth: '1990-01-01',
    phone: '+905551112233',
    email: 'test@example.com',
    department: 'Engineering',
    position: 'Developer'
  }
};

export const testEmployeesData = {
  fullList: [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson' }
  ],
  
  forUniqueId: [
    { id: 1, firstName: 'John' },
    { id: 5, firstName: 'Jane' },
    { id: 3, firstName: 'Bob' }
  ],
  
  forCount: [
    { id: 1, firstName: 'John' },
    { id: 2, firstName: 'Jane' },
    { id: 3, firstName: 'Bob' }
  ]
};

const mockTranslations = {
  Common: {
    'actions.add': 'Add',
    'actions.update': 'Update',
    'actions.cancel': 'Cancel',
    'actions.save': 'Save',
    'actions.delete': 'Delete',
    'actions.edit': 'Edit',
  },
  Employee: {
    'form.processing': 'Processing...',
    'form.fields.firstName': 'First Name',
    'form.fields.lastName': 'Last Name',
    'form.fields.email': 'Email Address',
    'form.fields.phone': 'Phone Number',
    'form.fields.department': 'Department',
    'form.fields.position': 'Position',
    'form.fields.dateOfEmployment': 'Date of Employment',
    'form.fields.dateOfBirth': 'Date of Birth',
    'form.requiredField': '*',
  }
};

const mockT = (key: string, options?: any, namespace?: string) => {
  const ns = namespace || 'Common';
  const translations = mockTranslations[ns as keyof typeof mockTranslations] || {};
  return translations[key as keyof typeof translations] || key;
};

const mockI18n = {
  on: vi.fn(),
  off: vi.fn(),
  t: mockT,
  changeLanguage: vi.fn().mockResolvedValue(undefined),
  language: 'en',
};

vi.mock('@/utils/i18n.ts', () => ({
  initI18n: vi.fn(),
  tCommon: vi.fn((key: string) => mockT(key, undefined, 'Common')),
  tEmployee: vi.fn((key: string) => mockT(key, undefined, 'Employee')),
  t: mockT,
  getCurrentLanguage: vi.fn(() => 'en'),
  changeLanguage: vi.fn().mockResolvedValue(undefined),
  translateWithPath: vi.fn((path: string, key: string) => mockT(key)),
  formatDate: vi.fn((date: any) => 'formatted-date'),
  formatCurrency: vi.fn((amount: number) => `$${amount}`),
  default: mockI18n,
}));

vi.mock('@/store/store.ts', () => ({
  store: {
    getState: vi.fn(() => ({
      employee: {
        viewMode: 'list',
        employees: [],
        currentView: 'employeeList',
        selectedEmployeeId: null,
      },
    })),
    subscribe: vi.fn((callback) => {
      return () => {};
    }),
    dispatch: vi.fn(),
  },
  setViewMode: vi.fn((mode) => ({ type: 'SET_VIEW_MODE', payload: mode })),
  showEmployeeList: vi.fn(() => ({ type: 'employee/showEmployeeList' })),
  showAddNew: vi.fn(() => ({ type: 'employee/showAddNew' })),
  toggleViewMode: vi.fn(() => ({ type: 'employee/toggleViewMode' })),
  setCurrentView: vi.fn((view) => ({ type: 'employee/setCurrentView', payload: view })),
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('lucide', () => ({
  Menu: vi.fn(),
  Grid3X3: vi.fn(),
  Users: vi.fn(),
  Plus: vi.fn(),
  X: vi.fn(),
  ChevronDown: vi.fn(),
  ChevronLeft: vi.fn(),
  ChevronRight: vi.fn(),
  Loader2: vi.fn(),
  createElement: vi.fn((component, config) => {
    const div = document.createElement('div');
    div.className = config?.class || '';
    div.setAttribute('data-icon', 'mocked-icon');
    return div;
  }),
}));