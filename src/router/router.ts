import { Router } from '@vaadin/router';

import '@/views/home-view.ts';
import '@/views/employee/employee-view';
import '@/views/settings-view.ts';

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