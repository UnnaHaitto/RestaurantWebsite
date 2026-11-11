import {restaurants, fetchRestaurants} from './restaurantFetch.js';

// Displays fetched restaurants on a map
async function displayRestaurants() {
  await fetchRestaurants();

  var map = L.map('map').setView([60.188222, 24.829696], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  for (let restaurant of restaurants) {
    let lat = restaurant.location.coordinates[0];
    let long = restaurant.location.coordinates[1];

    let marker = L.marker([long, lat]).addTo(map);

    // Shows restaurant and address when market clicked
    marker.bindPopup(
      '<h3>' + restaurant.name + '</h3> <p>' + restaurant.address + '</p>'
    );
  }
}

displayRestaurants();
