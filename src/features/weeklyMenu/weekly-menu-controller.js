import {createHeader} from '../../shared/headerController/header-controller.js';

import {getWeeklyMenu, getMonth} from './weekly-menu-model.js';

import {
  setRestaurantName,
  setMonth,
  createDayNavigation,
  createMenu,
  attachListenersToNav,
} from './weekly-menu-view.js';

// Get restaurant information from the URL parameters.
const parameters = location.search.split('&');
const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

// Stores the weekly menu courses, organized by weekday.
const weeklyMenuItems = {};

/**
 * Fetches the weekly menu for the selected restaurant and organizes the items by weekday.
 */
async function createElements() {
  try {
    const weeklyMenu = await getWeeklyMenu(restaurantId);

    for (let i = 0; i < weeklyMenu.days.length; i++) {
      const weekday = weeklyMenu.days[i].date.split(' ')[0];
      const daysCourses = weeklyMenu.days[i];

      weeklyMenuItems[weekday] = daysCourses;
    }
  } catch (error) {
    console.log('Failed to fetch weekyl menu: ', error);
  }
}

/**
 * Handles clicks on the day navigation buttons.
 *
 * Attaches the necessary event listeners and displays the menu for the selected day.
 *
 * @param {String} day - The selected weekday.
 * @param {HTMLElement} button - The clicked navigation button.
 */
function handleDayClick(day, button) {
  const handleMenuCreation = (selectedDay) => {
    createMenu(selectedDay, weeklyMenuItems);
  };

  attachListenersToNav(day, button, handleMenuCreation);
}

/**
 * Displays monday's menu as the default menu.
 */
function createDefaultMenu() {
  createMenu('maanantai', weeklyMenuItems);
}

/**
 * Determines the month from the fetched weekly menu and updates the month displayed on the page.
 */
function displayMonth() {
  let apiMonth = '';

  apiMonth =
    Object.keys(weeklyMenuItems).length === 0
      ? ''
      : weeklyMenuItems['maanantai'].date.split('. ')[1];

  const month = getMonth(apiMonth);

  setMonth(month);
}

/**
 * Initializes the weekly menu page.
 */
async function initializeWeeklyMenu() {
  createHeader();

  await createElements();

  createDayNavigation(weeklyMenuItems, handleDayClick);

  createDefaultMenu();

  setRestaurantName(restaurantName);

  displayMonth();
}

export {initializeWeeklyMenu};
