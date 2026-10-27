'use strict';
function mainPage() {
  return `<main>
      <!-- List of all the restaurant elements will be added here in the future. -->
      <div id="restaurant">
        <img src="images/restaurant.jpeg" alt="Restaurant Image" />
        <div class="container">
        <div class="restaurant-info">
        <h2>Restaurant Name</h2>
        <p>Company Name</p>
        </div>
        <div class="like-button-container">
        <p class="like-button">♡</p>
        </div>
        </div>
        <p>Description of the restaurant.</p>
        <p>Location: Address, postal code</p>
        <p>Phone: (123) 456-7890</p>
        <p class="menu-link-daily">Daily Menu</p>
        <p class="menu-link-weekly">Weekly Menu</p>
      </div>
    </main>
`;
}

function menuPage() {
  return `<main>
      <h2>Menu</h2>
      <ul>
        <li>Dish 1 - $10</li>
        <li>Dish 2 - $12</li>
        <li>Dish 3 - $15</li>
      </ul>
    </main>`;
}

function header() {
  return `<header>
      <h1>Restaurant Website</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>`;
}

function footer() {
  return `<footer>
      <p>&copy; 2026 Restaurant Website. All rights reserved.</p>
    </footer>`;
}
