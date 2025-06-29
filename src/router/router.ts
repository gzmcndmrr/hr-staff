import { Router } from '@vaadin/router';

import '@/views/employee/employee-view';

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
      path: '(.*)',
      redirect: '/'
    }
  ]);

  return router;
} 