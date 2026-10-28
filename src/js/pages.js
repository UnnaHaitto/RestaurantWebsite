'use strict';
function mainPage() {
  //List all the restaurant elements here in the future
  return `<main>
      <h1>Ravintolat</h1>
      <div id="restaurant">
        <img src="images/restaurant.jpeg" alt="Kuva ravintolasta" />
        <div class="container">
        <div class="restaurant-info">
        <h2>Ravintolan nimi</h2>
        <p>Yrityksen nimi</p>
        </div>
        <div class="like-button-container">
        <p class="like-button">♡</p>
        </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Osoite: osoite, postiosoite</p>
        <p>Puhelinnumero: +358 11 111</p>
        <p class="menu-link-daily">Päivän menu</p>
        <p class="menu-link-weekly">Viikon menu</p>
      </div>
    </main>
`;
}

function menuPageWeekly() {
  return (
    // FETCH HERE THE DAYS THAT THE MENU OIS
    `<h2>Viikon menu | Ravintolan nimi</h2>`
  );
}

function menuPageDaily() {
  return `<main>
      <h1>Päivän menu | Ravintolan nimi </h1>
      <p>Ruokalaji 1: Kuvaus, Hinta</p>
      <p>Ruokalaji 2: Kuvaus, Hinta</p>
      <p>Ruokalaji 3: Kuvaus, Hinta</p>
      <p>Ruokalaji 4: Kuvaus, Hinta</p>
      <p>Ruokalaji 5: Kuvaus, Hinta</p>
    </main>`;
}

function header() {
  return `<header>
      <h1>Ravintola listaaja</h1>
      <nav>
        <ul>
          <li><p class="nav-link">Koti</p></li>
        </ul>
      </nav>
    </header>`;
}

function footer() {
  return `<footer>
      <p>&copy; 2026 Ravintola Listaaja. Kaikki oikeudet pidätetään.</p>
    </footer>`;
}
