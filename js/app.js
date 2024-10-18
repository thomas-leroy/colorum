import { initRouter } from './router.js';
import { initGlobalListener } from './utils/events.js';

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initGlobalListener();
});
