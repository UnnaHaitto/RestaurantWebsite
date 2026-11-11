import {restaurants, fetchRestaurants} from './restaurantFetch.js';

// Tracks the current selected page
let currentPage = 1;

// How many restaurants displayed each page
const restaurantAmount = 4;

// Fetches restaurants and sorts them based on the their distance from the user
async function sortRestaurants(userLat, userLong) {
  await fetchRestaurants();

  // Users cordinates
  const x = userLong;
  const y = userLat;

  // Sorts restaurants
  restaurants.sort((a, b) => {
    let x2 = a.location.coordinates[0];
    let y2 = a.location.coordinates[1];
    let x3 = b.location.coordinates[0];
    let y3 = b.location.coordinates[1];

    let distanceA = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    let distanceB = Math.sqrt(Math.pow(x3 - x, 2) + Math.pow(y3 - y, 2));

    if (distanceA > distanceB) {
      return 1;
    } else if (distanceA < distanceB) {
      return -1;
    } else {
      return 0;
    }
  });
}

// Displays the restaurants belonging to the current page
function displayRestaurants() {
  const container = document.querySelector('.restaurant-container');

  // Calculates the index of the first restaurant on the current page
  const start = (currentPage - 1) * restaurantAmount;

  // Calculated the index of the last restaurant on the current page
  const end = start + restaurantAmount;

  // Selects the restaurants that belong to the current page
  const restaurantPerPage = restaurants.slice(start, end);

  let html = '';

  // Goes through each restaurant on the current page
  for (let restaurant of restaurantPerPage) {
    console.log(restaurant);
    html += '<div class="restaurants">';
    html += '<div class="food-image-container">';
    html += '<img src="../images/restaurant.jpeg" alt="Kuva ravintolasta" />';
    html += '</div>';
    html += '<div class="container">';
    html += '<div class="restaurant-info">';
    html += '<h2>' + restaurant.name + '</h2>';
    html += '<p>' + restaurant.company + '</p>';
    html += '</div>';
    html += '<div class="like-button-container">';
    html += '<p class="like-button">♡</p>';
    html += '</div>';
    html += '</div>';
    html += '<div class="restaurant-info-container">';
    html +=
      '<p>Osoite: ' + restaurant.city + ', ' + restaurant.postalCode + '</p>';
    html += '<p>Puhelinnumero: ' + restaurant.phone + '</p>';
    html += '</div>';
    html += '<div class="restaurant-menu-container">';
    html += '<a href="dailyMenu.html">Päivän menu</a>';
    html += '<a href="weeklyMenu.html">Viikon menu</a>';
    html += '</div>';
    html += '</div>';
  }

  container.innerHTML = html;
}

// Creates and displays the pagination buttons
function displayPagination() {
  const pagination = document.querySelector('.pagination');

  // Calculates how many pages are needed
  const totalPages = Math.ceil(restaurants.length / restaurantAmount);

  let html = '';

  html += '<a href="#" data-page="' + (currentPage - 1) + '">&laquo;</a>';

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += '<a href="#" data-page="' + i + '" class="active">' + i + '</a>';
    } else {
      html += '<a href="#" data-page="' + i + '">' + i + '</a>';
    }
  }

  html += '<a href="#" data-page="' + (currentPage + 1) + '">&raquo;</a>';

  pagination.innerHTML = html;
}

// Adds event listeners to the pagination container
document
  .querySelector('.pagination')
  .addEventListener('click', function (event) {
    event.preventDefault();

    // Gets the page number from the clicked pagination buttons
    const page = Number(event.target.dataset.page);

    // Total number of pages
    const totalPages = Math.ceil(restaurants.length / restaurantAmount);

    // Check that selected page number is valid
    if (page >= 1 && page <= totalPages) {
      // Updates current page
      currentPage = page;

      // Displays restaurants of that page
      displayRestaurants();

      // Displays updated pagination
      displayPagination();
    }
  });

async function success(pos) {
  const crd = pos.coords;
  const userLat = crd.latitude;
  const userLong = crd.longitude;

  await sortRestaurants(userLat, userLong);

  displayRestaurants();
  displayPagination();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error);
