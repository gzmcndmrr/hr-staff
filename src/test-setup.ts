import { vi } from 'vitest';

vi.mock('@/utils/i18n.ts', () => ({
  initI18n: vi.fn(),
  tCommon: vi.fn((key: string) => key),
  tEmployee: vi.fn((key: string) => key),
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
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  },
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