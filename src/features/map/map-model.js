import {
  restaurants,
  fetchRestaurants,
} from '../../shared/restaurantFetch/restaurantFetch.js';

/**
 * Fetches all the restaurants.
 *
 * @returns {Promise<Array>} restaurants - An array of restaurant objects.
 */
async function getRestaurants() {
  await fetchRestaurants();

  return restaurants;
}

export {getRestaurants};
