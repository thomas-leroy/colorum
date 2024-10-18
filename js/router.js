export function initRouter() {
  window.addEventListener('hashchange', loadPage);
  loadPage();
}

function loadPage() {
  const DEFAULT_PAGE = 'home';

  const page = window.location.hash.substring(1) || DEFAULT_PAGE;
  const app = document.getElementById('app');

  import(`./components/${page}.js`).then((module) => {
    app.innerHTML = module.render();
  });
}
