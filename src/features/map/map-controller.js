import {getRestaurants} from './map-model.js';

import {initializeMap, displayRestaurants} from './map-view.js';

import {createHeader} from '../../shared/headerController/header-controller.js';

/**
 * Fetches restaurants, Initializes map and displays the restaurants on the map.
 */
async function restaurantController() {
  createHeader();

  try {
    const restaurants = await getRestaurants();

    initializeMap();

    displayRestaurants(restaurants);
  } catch (error) {
    console.log('Unable to display restaurants: ', error);
  }
}

export {restaurantController};
