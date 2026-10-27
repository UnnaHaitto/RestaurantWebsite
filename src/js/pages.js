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

function menuOfTheDay() {
  return `<main>
      <h1>Menu of the Day | Restaurant Name </h1>
      <p>Item 1: Description, Price</p>
      <p>Item 2: Description, Price</p>
      <p>Item 3: Description, Price</p>
      <p>Item 4: Description, Price</p>
      <p>Item 5: Description, Price</p>
    </main>`;
}

function menuPageWeekly() {
  return (
    `<nav>
      <h1>Menu | Restaurant Name </h1>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Monday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Tuesday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Wednesday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Thursday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Friday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Saturday</a>
      <a class="menu-link-day" href="` +
    menuOfTheDay() +
    `">Sunday</a>
    </nav>`
  );
}

function menuPageDaily() {
  return `<main>
      <h1>Menu | Restaurant Name </h1>
      <p>Item 1: Description, Price</p>
      <p>Item 2: Description, Price</p>
      <p>Item 3: Description, Price</p>
      <p>Item 4: Description, Price</p>
      <p>Item 5: Description, Price</p>
    </main>`;
}

function header() {
  return `<header>
      <h1>Restaurant Website</h1>
      <nav>
        <ul>
          <li><p class="nav-link">Home</p></li>
        </ul>
      </nav>
    </header>`;
}

function footer() {
  return `<footer>
      <p>&copy; 2026 Restaurant Website. All rights reserved.</p>
    </footer>`;
}
