import {
  restaurants as restaurantData,
  fetchRestaurants,
} from '../../shared/restaurantFetch/restaurantFetch.js';

let restaurants = [];

/**
 * Fetches restaurants from the API.
 */
async function loadRestaurants() {
  await fetchRestaurants();

  restaurants = [...restaurantData];
}

/**
 * Sorts restaurants by their distance from the user.
 *
 * @param {number} userLat - The users latitude.
 * @param {number} userLong - The users longitude.
 *
 * @returns {Integer} - Is the restaurant comparably closer or further.
 */
function sortRestaurants(userLat, userLong) {
  // Users cordinates
  const x = userLong;
  const y = userLat;

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

/**
 * Returns restaurants belonging to a specific page
 *
 * @param {number} page - The page index.
 * @param {number} amount - The amount of restaurants per page.
 */
function getRestaurants(page, amount) {
  const start = (page - 1) * amount;

  const end = start + amount;

  return restaurants.slice(start, end);
}

/**
 * Calculates the total number of pages.
 *
 * @param {number} amount - The amount of pages overall.
 */
function getTotalPages(amount) {
  return Math.ceil(restaurants.length / amount);
}

export {loadRestaurants, sortRestaurants, getRestaurants, getTotalPages};
