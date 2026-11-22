import {getWeeklyMenu, getMonth} from './weekly-menu-model.js';

import {
  setRestaurantName,
  setMonth,
  createDayNavigation,
  createMenu,
  attachListenersToNav,
} from './weekly-menu-view.js';

const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

const weeklyMenuItems = {};

async function createElements() {
  try {
    const weeklyMenu = await getWeeklyMenu(restaurantId);

    for (let i = 0; i < weeklyMenu.days.length; i++) {
      const weekday = weeklyMenu.days[i].date.split(' ')[0];
      const daysCourses = weeklyMenu.days[i];

      weeklyMenuItems[weekday] = daysCourses;
    }
  } catch (error) {
    console.log('Virhe menun hakemisessa: ', error);
  }
}

function handleDayClick(day, button) {
  const handleMenuCreation = (selectedDay) => {
    createMenu(selectedDay, weeklyMenuItems);
  };

  attachListenersToNav(day, button, handleMenuCreation);
}

function createDefaultMenu() {
  createMenu('maanantai', weeklyMenuItems);
}

function displayMonth() {
  const apiMonth = weeklyMenuItems['maanantai'].date.split('. ')[1];

  const month = getMonth(apiMonth);

  setMonth(month);
}

async function initializeWeeklyMenu() {
  await createElements();

  createDayNavigation(weeklyMenuItems, handleDayClick);

  createDefaultMenu();

  setRestaurantName(restaurantName);

  displayMonth();
}

export {initializeWeeklyMenu};
