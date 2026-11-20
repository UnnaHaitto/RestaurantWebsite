import {getDailyMenu} from './daily-menu-model';

import {displayDailyMenu, displayRestaurantName} from './daily-menu-view';

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
