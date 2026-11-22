const token = sessionStorage.getItem('token');

/**
 * Creates the HTML for the header and displays it on the page.
 */
function createHeader() {
  let html = '';

  html += '<h1>Ravintola listaaja</h1>';
  html += '<nav class="header-nav">';
  html += '<div class="burger-menu">';
  html += '<label for="menu" tabindex="0"> ☰ </label>';
  html += '<input id="menu" type="checkbox" />';
  html += '</div>';
  html += '<ul>';
  html += '<li><a href="./main.html">Koti</a></li>';
  html += '<li><a href="./map.html">Ravintolat kartalla</a></li>';
  html += !token
    ? '<li><a href="../../../public/login.html">Kirjaudu sisään</a></li>'
    : '<li><a href="../../../public/userPage.html">Käyttäjä sivulle</a></li>';
  html += '</ul>';
  html += '</nav>';

  document.querySelector('header').innerHTML = html;
}

export {createHeader};
