import {
  restaurants,
  fetchRestaurants,
} from '../shared/restaurantFetch/restaurantFetch.js';

/**
 * Fetches all restaurants and displays them on a map.
 * Adds a popup containing each restaurant's name and address.
 */
async function displayRestaurants() {
  try {
    await fetchRestaurants();

    const map = L.map('map').setView([60.188222, 24.829696], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    for (const restaurant of restaurants) {
      const [lat, long] = restaurant.location.coordinates;

      const marker = L.marker([long, lat]).addTo(map);

      marker.bindPopup(
        '<h3>' + restaurant.name + '</h3> <p>' + restaurant.address + '</p>'
      );
    }
  } catch (error) {
    console.log('Unable to display restaurants: ', error);
  }
}

displayRestaurants();
