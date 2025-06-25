import '@/styles/globals.css';
import '@/components/app-main';
import '@/store/store';

const app = document.querySelector('#app');
if (app) {
  app.innerHTML = '<app-main></app-main>';
} 