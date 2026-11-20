import {apiUrl} from '../../shared/api/api';

/**
 * Fetches the daily menu for a restaurant from the REST API.
 *
 * @param {string} restaurantId - the ID of the restaurant.
 * @returns {Promise<Object>} - the restaurant's daily menu.
 */
async function getDailyMenu(restaurantId) {
  const response = await fetch(
    apiUrl + '/api/v1/restaurants/daily/' + restaurantId + '/fi'
  );

  if (!response.ok) {
    throw new Error('Unable to fetch daily menu!');
  }

  const dailyMenu = await response.json();

  return dailyMenu;
}

export {getDailyMenu};
