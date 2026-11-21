import {
  loadRestaurants,
  sortRestaurants,
  getRestaurants,
  getTotalPages,
} from './main-model.js';

import {
  displayRestaurants,
  displayPagination,
  bindPaginationEvents,
  bindMenuEvents,
} from './main-view.js';

// What page the user is on.
let currentPage = 1;

// The amount of restaurants per page
const restaurantAmount = 4;

/**
 * Displays restaurants belonging to the current page.
 */
function updateRestaurantPage() {
  const restaurantsPerPage = getRestaurants(currentPage, restaurantAmount);

  displayRestaurants(restaurantsPerPage);

  displayPagination(currentPage, getTotalPages(restaurantAmount));
}

/**
 * Handles pagination.
 *
 * @param {number} page - The current page the user is on.
 */
function handlePagination(page) {
  const totalPages = getTotalPages(restaurantAmount);

  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    updateRestaurantPage();
  }
}

/**
 *
 * @param {String} type - The type of the selected element.
 * @param {number} restaurantId - The id of the selected restaurant.
 * @param {String} restaurantName - The name of the selected restaurant.
 */
function handleMenuNavigation(type, restaurantId, restaurantName) {
  const page =
    type === 'daily'
      ? '../../../public/dailyMenu.html'
      : '../../../public/weeklyMenu.html';

  location.href =
    page + '?id=' + restaurantId + '&restaurantName=' + restaurantName;
}

/**
 * Handles successfull geolocation.
 *
 * @param {GeolocationCoordinates} pos - The user's geographical position.
 */
async function handleLocationSuccess(pos) {
  const crd = pos.coords;
  const userLat = crd.latitude;
  const userLong = crd.longitude;

  await loadRestaurants();

  sortRestaurants(userLat, userLong);

  updateRestaurantPage();
}

/**
 * Handles geolocation errors.
 *
 * @param {GeolocationPositionError} error
 */
async function handleLocationError(error) {
  console.warn(`ERROR(${error.code}): ${error.message}`);

  await loadRestaurants();

  updateRestaurantPage();
}

function initRestaurantController() {
  bindPaginationEvents(handlePagination);
  bindMenuEvents(handleMenuNavigation);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      handleLocationError,
      handleLocationSuccess
    );
  } else {
    handleLocationError({
      code: 0,
      message: 'Geolocation is not supported.',
    });
  }
}

export {initRestaurantController};
