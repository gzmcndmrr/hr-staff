import { describe, test, expect, vi, beforeEach } from 'vitest';

vi.unmock('@/store/store.ts');

import { 
  store, 
  setViewMode, 
  toggleViewMode, 
  showEmployeeList, 
  showAddNew, 
  setCurrentView,
  type RootState,
  type AppDispatch 
} from '@/store/store';

describe('Store Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should create store with correct reducers', () => {
    expect(store).toBeDefined();
    expect(typeof store.getState).toBe('function');
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.subscribe).toBe('function');
  });

  test('should have correct initial state structure', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('employee');
    expect(state).toHaveProperty('placeholder');
    expect(state.placeholder).toEqual({});
  });

  test('should export action creators', () => {
    expect(typeof setViewMode).toBe('function');
    expect(typeof toggleViewMode).toBe('function');
    expect(typeof showEmployeeList).toBe('function');
    expect(typeof showAddNew).toBe('function');
    expect(typeof setCurrentView).toBe('function');
  });

  test('should dispatch setViewMode action correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = setViewMode('grid');
    
    store.dispatch(action);
    
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('employee/setViewMode');
    expect(action.payload).toBe('grid');
  });

  test('should dispatch toggleViewMode action correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = toggleViewMode();
    
    store.dispatch(action);
    
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('employee/toggleViewMode');
  });

  test('should dispatch showEmployeeList action correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = showEmployeeList();
    
    store.dispatch(action);
    
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('employee/showEmployeeList');
  });

  test('should dispatch showAddNew action correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = showAddNew();
    
    store.dispatch(action);
    
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('employee/showAddNew');
  });

  test('should dispatch setCurrentView action correctly', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const action = setCurrentView('addNew');
    
    store.dispatch(action);
    
    expect(dispatchSpy).toHaveBeenCalledWith(action);
    expect(action.type).toBe('employee/setCurrentView');
    expect(action.payload).toBe('addNew');
  });
});

describe('Type Exports', () => {
  test('should export correct TypeScript types', () => {
    const state: RootState = store.getState();
    const dispatch: AppDispatch = store.dispatch;
    
    expect(state).toBeDefined();
    expect(typeof dispatch).toBe('function');
  });
}); 