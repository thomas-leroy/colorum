export function initRouter() {
  window.addEventListener('hashchange', loadPage);
  loadPage();
}

function loadPage() {
  const COMPONENTS_DIRECTORY = 'views';
  const DEFAULT_PAGE = 'home';

  const page = window.location.hash.substring(1) || DEFAULT_PAGE;
  const app = document.getElementById('app');

  fetch(`/${COMPONENTS_DIRECTORY}/${page}.html`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error loading ${page}.html`);
      }
      return response.text();
    })
    .then((html) => {
      app.innerHTML = html;
    })
    .catch((error) => {
      app.innerHTML = `<p>Page not found</p>`;
    });
}
