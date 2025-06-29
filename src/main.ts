import '@/styles/globals.css';
import '@/store/store';
import { initRouter } from '@/router/router';
import { initI18n } from '@/utils/i18n';

const app = document.querySelector('#app');
if (app) {
  app.innerHTML = `
    <div id="router-outlet"></div>
  `;
  
  initI18n().then(() => {
    setTimeout(() => {
      initRouter();
    }, 0);
  }).catch(console.error);
} 