import { Router } from '@vaadin/router';

// Import views
import '../views/home-view.ts';
import '../views/employee-view.ts';
import '../views/settings-view.ts';

export function initRouter(): Router | undefined {
  const outlet = document.getElementById('router-outlet');
  
  if (!outlet) {
    return;
  }

  const router = new Router(outlet);

  router.setRoutes([
    {
      path: '/',
      component: 'employee-view',
      name: 'employees'
    },
    {
      path: '/home',
      component: 'home-view',
      name: 'home'
    },
    {
      path: '/settings',
      component: 'settings-view',
      name: 'settings'
    },
    {
      path: '(.*)',
      redirect: '/'
    }
  ]);

  return router;
} 