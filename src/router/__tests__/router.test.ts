import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { initRouter } from '@/router/router';

const mockSetRoutes = vi.fn();

vi.mock('@vaadin/router', () => ({
  Router: vi.fn().mockImplementation(() => ({
    setRoutes: mockSetRoutes
  }))
}));

vi.mock('@/views/employee/employee-view', () => ({}));

describe('Router Configuration', () => {
  let routerOutlet: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    
    routerOutlet = document.createElement('div');
    routerOutlet.id = 'router-outlet';
    document.body.appendChild(routerOutlet);
  });

  afterEach(() => {
    if (routerOutlet && routerOutlet.parentNode) {
      routerOutlet.parentNode.removeChild(routerOutlet);
    }
  });

  test('should initialize router when outlet element exists', async () => {
    const { Router } = await import('@vaadin/router');
    
    const router = initRouter();
    
    expect(Router).toHaveBeenCalledWith(routerOutlet);
    expect(router).toBeDefined();
    expect(mockSetRoutes).toHaveBeenCalled();
  });

  test('should return undefined when outlet element does not exist', () => {
    document.body.removeChild(routerOutlet);
    
    const router = initRouter();
    
    expect(router).toBeUndefined();
  });

  test('should configure correct routes', () => {
    initRouter();
    
    expect(mockSetRoutes).toHaveBeenCalledWith([
      {
        path: '/',
        component: 'employee-view',
        name: 'employees'
      },
      {
        path: '(.*)',
        redirect: '/'
      }
    ]);
  });

  test('should set root path to employee-view component', () => {
    initRouter();
    
    expect(mockSetRoutes).toHaveBeenCalled();
    const calls = mockSetRoutes.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    
    const routes = calls[0]?.[0];
    expect(routes).toBeDefined();
    
    const rootRoute = routes.find((route: any) => route.path === '/');
    
    expect(rootRoute).toBeDefined();
    expect(rootRoute.component).toBe('employee-view');
    expect(rootRoute.name).toBe('employees');
  });

  test('should have catch-all route that redirects to root', () => {
    initRouter();
    
    expect(mockSetRoutes).toHaveBeenCalled();
    const calls = mockSetRoutes.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    
    const routes = calls[0]?.[0];
    expect(routes).toBeDefined();
    
    const catchAllRoute = routes.find((route: any) => route.path === '(.*)');
    
    expect(catchAllRoute).toBeDefined();
    expect(catchAllRoute.redirect).toBe('/');
  });

  test('should configure routes in correct order', () => {
    initRouter();
    
    expect(mockSetRoutes).toHaveBeenCalled();
    const calls = mockSetRoutes.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    
    const routes = calls[0]?.[0];
    expect(routes).toBeDefined();
    expect(routes).toHaveLength(2);
    expect(routes[0].path).toBe('/');
  });
}); 