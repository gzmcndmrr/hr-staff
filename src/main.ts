import '@/styles/globals.css';
import '@/store/store';
import { initRouter } from '@/router/router';

const app = document.querySelector('#app');
if (app) {
  app.innerHTML = `
    <div id="router-outlet"></div>
  `;
  
  setTimeout(() => {
    initRouter();
  }, 0);
} 