let map;

/**
 * Initializes the Leaflet map.
 */
function initializeMap() {
  map = L.map('map').setView([60.188222, 24.829696], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

/**
 * Dsiplays restaurants on the map with markers and popups.
 *
 * @param {Array} restaurants - An array of restaurant objects.
 */
function displayRestaurants(restaurants) {
  for (const restaurant of restaurants) {
    const [lat, long] = restaurant.location.coordinates;

    const marker = L.marker([long, lat]).addTo(map);

    marker.bindPopup(
      '<h3>' + restaurant.name + '</h3> <p>' + restaurant.address + '</p>'
    );
  }
}

export {initializeMap, displayRestaurants};
