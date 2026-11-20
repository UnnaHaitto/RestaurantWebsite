import {getDailyMenu} from './daily-menu-model.js';

import {displayDailyMenu, displayRestaurantName} from './daily-menu-view';

/**
 * Creates and displays the daily menu for a restaurant.
 *
 * @param {number} restaurantId - The ID of the selected restaurant.
 * @param {String} restaurantName - The name of the selected restaurant.
 */
const createMenu = async (restaurantId, restaurantName) => {
  try {
    const dailyMenu = await getDailyMenu(restaurantId);

    displayRestaurantName(restaurantName);
    displayDailyMenu(dailyMenu);
  } catch (error) {
    console.log('Failed to display menu: ', error.message);
  }
};

export {createMenu};
