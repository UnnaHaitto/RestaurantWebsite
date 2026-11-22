/**
 * Updates the restaurant name and displays it on the page.
 *
 * @param {String} name - The name of the restaurant.
 */
function setRestaurantName(name) {
  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = name;
}

/**
 * Displays the menu month on the page.
 *
 * @param {String} month - The month to display.
 */
function setMonth(month) {
  const monthContainer = document.querySelector('.month');

  month !== ''
    ? (monthContainer.innerText = month)
    : (monthContainer.innerHTML = '<h1>Ei voitu hakea kuukautta</h1>');
}

/**
 * Creates navigation buttons for each weekday and attaches click event listeners to them.
 *
 * @param {Object} weeklyMenuItems - The weekly menu organized by weekday.
 * @param {Function} onDayClick - Callback executed when a weekday is pressed.
 */
function createDayNavigation(weeklyMenuItems, onDayClick) {
  const dayContainer = document.querySelector('#day-container');

  let days = ['maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai'];

  for (let i = 0; i < days.length; i++) {
    let date = '';

    days[i] in weeklyMenuItems
      ? (date = weeklyMenuItems[days[i]].date.split('.')[0] + '.')
      : (date = days[i]);

    const button = document.createElement('button');

    button.textContent = date;

    button.classList.add('day-button');

    i === 0 && button.classList.add('active');

    button.addEventListener('click', () => {
      onDayClick(days[i], button);
    });

    dayContainer.appendChild(button);
  }
}

/**
 * Creates and displays the menu for the selected weekday.
 *
 * @param {Stirng} day - The selected weekday.
 * @param {Object} weeklyMenuItems - The weekly menu organized by weekday.
 * @returns
 */
function createMenu(day, weeklyMenuItems) {
  let foodItemCotainer = document.querySelector('.food-items-container');

  if (Object.keys(weeklyMenuItems).length === 0) {
    foodItemCotainer.innerHTML = '<h1>Ei menua saatavilla</h1>';
    return;
  }

  foodItemCotainer.innerHTML = '';

  let htmlMenu = '';

  htmlMenu += '<div id="' + day + '" class="menu">';

  for (let course of weeklyMenuItems[day].courses) {
    htmlMenu += '<div class="food-container">';
    htmlMenu += '<div class="food-data-container">';
    htmlMenu += '<p class="food-name">' + course.name + '</p>';
    htmlMenu += '<p class="food-price">' + course.price + '</p>';
    htmlMenu += '</div>';
    htmlMenu += '<p class="allergen-info">' + course.diets + '</p>';
    htmlMenu += '</div>';
  }

  htmlMenu += '</div>';

  foodItemCotainer.innerHTML = htmlMenu;
}

/**
 * Updates the active state of the weekday navigation buttons and calls the callback for the selected day.
 *
 * @param {String} day - The selected weekday.
 * @param {HTMLElement} button - The clicked navigation button.
 * @param {Function} onDayClick - Callback executed for the selected day.
 */
function attachListenersToNav(day, button, onDayClick) {
  const allDayButtons = document.querySelectorAll('.day-button');

  allDayButtons.forEach((dayButton) => {
    dayButton.classList.remove('active');
  });

  button.classList.add('active');

  onDayClick(day);
}

export {
  setRestaurantName,
  setMonth,
  createDayNavigation,
  createMenu,
  attachListenersToNav,
};
