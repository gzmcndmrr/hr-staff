import './styles/globals.css';
import './components/app-shell';
import './store/store';

const app = document.querySelector('#app');
if (app) {
  app.innerHTML = '<app-shell></app-shell>';
} 