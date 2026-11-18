const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

/**
 * Fetches the weekly menu for a restaurant from the REST API.
 */
async function createWeeklyMenu() {
  const weeklyMenu = await getWeeklyMenu(restaurantId);

  const h1Container = document.querySelector('.restaurant-name');
  const monthContainer = document.querySelector('.month');
  const dayContainer = document.querySelector('#day-container');
  const foodItemCotainer = document.querySelector('.food-items-container');

  const date = weeklyMenu.days;

  let month = date[1].date.split('. ')[1];

  const monthName = getMonth(month);

  h1Container.innerText = restaurantName;

  monthContainer.innerText = monthName;

  let days = [];
  let courses = [];

  for (let day of date) {
    days.push(day.date.split('. ')[0] + '.');

    courses.push(day.courses);
  }

  let htmlDays = '';

  let htmlMenu = '';

  for (let i = 0; i < days.length; i++) {
    switch (days[i].split(' ')[0]) {
      case 'maanantai':
        htmlDays +=
          '<a href="#monday" class="day-button active">' + days[i] + '</a>';

        htmlMenu += '<div id="monday" class="menu show-menu">';

        for (let course of courses[i]) {
          htmlMenu += '<div class="food-container">';
          htmlMenu += '<div class="food-data-container">';
          htmlMenu += '<p class="food-name">' + course.name + '</p>';
          htmlMenu += '<p class="food-price">' + course.price + '</p>';
          htmlMenu += '</div>';
          htmlMenu += '<p class="allergen-info">';
          for (let restriction of course.diets) {
            htmlMenu += restriction + ' ';
          }
          htmlMenu += '</p>';
          htmlMenu += '</div>';
        }

        htmlMenu += '</div>';

        break;
      case 'tiistai':
        htmlDays += '<a href="#tuesday" class="day-button">' + days[i] + '</a>';

        htmlMenu += '<div id="tuesday" class="menu">';

        for (let course of courses[i]) {
          htmlMenu += '<div class="food-container">';
          htmlMenu += '<div class="food-data-container">';
          htmlMenu += '<p class="food-name">' + course.name + '</p>';
          htmlMenu += '<p class="food-price">' + course.price + '</p>';
          htmlMenu += '</div>';
          htmlMenu += '<p class="allergen-info">';
          for (let restriction of course.diets) {
            htmlMenu += restriction + ' ';
          }
          htmlMenu += '</p>';
          htmlMenu += '</div>';
        }

        htmlMenu += '</div>';

        break;
      case 'keskiviikko':
        htmlDays +=
          '<a href="#wednesday" class="day-button">' + days[i] + '</a>';

        htmlMenu += '<div id="wednesday" class="menu">';

        for (let course of courses[i]) {
          htmlMenu += '<div class="food-container">';
          htmlMenu += '<div class="food-data-container">';
          htmlMenu += '<p class="food-name">' + course.name + '</p>';
          htmlMenu += '<p class="food-price">' + course.price + '</p>';
          htmlMenu += '</div>';
          htmlMenu += '<p class="allergen-info">';
          for (let restriction of course.diets) {
            htmlMenu += restriction + ' ';
          }
          htmlMenu += '</p>';
          htmlMenu += '</div>';
        }

        htmlMenu += '</div>';

        break;
      case 'torstai':
        htmlDays +=
          '<a href="#thursday" class="day-button">' + days[i] + '</a>';

        htmlMenu += '<div id="thursday" class="menu">';

        for (let course of courses[i]) {
          htmlMenu += '<div class="food-container">';
          htmlMenu += '<div class="food-data-container">';
          htmlMenu += '<p class="food-name">' + course.name + '</p>';
          htmlMenu += '<p class="food-price">' + course.price + '</p>';
          htmlMenu += '</div>';
          htmlMenu += '<p class="allergen-info">';
          for (let restriction of course.diets) {
            htmlMenu += restriction + ' ';
          }
          htmlMenu += '</p>';
          htmlMenu += '</div>';
        }

        htmlMenu += '</div>';

        break;
      case 'perjantai':
        htmlDays += '<a href="#friday" class="day-button">' + days[i] + '</a>';

        htmlMenu += '<div id="friday" class="menu">';

        for (let course of courses[i]) {
          htmlMenu += '<div class="food-container">';
          htmlMenu += '<div class="food-data-container">';
          htmlMenu += '<p class="food-name">' + course.name + '</p>';
          htmlMenu += '<p class="food-price">' + course.price + '</p>';
          htmlMenu += '</div>';
          htmlMenu += '<p class="allergen-info">';
          for (let restriction of course.diets) {
            htmlMenu += restriction + ' ';
          }
          htmlMenu += '</p>';
          htmlMenu += '</div>';
        }

        htmlMenu += '</div>';

        break;
    }
  }

  foodItemCotainer.innerHTML = htmlMenu;

  dayContainer.innerHTML = htmlDays;

  addDayEventListeners();
}

/**
 * Adds event listeners for every day navigation button.
 * Adds active class to the current selected day.
 */
function addDayEventListeners() {
  const days = document.querySelectorAll('.day-button');

  days.forEach((day) => {
    day.addEventListener('click', function (event) {
      event.preventDefault();

      const dayName = day.href.split('#')[1];

      const allMenus = document.querySelectorAll('.menu');

      const allDayButtons = document.querySelectorAll('.day-button');

      allDayButtons.forEach((dayButton) => {
        dayButton.classList.remove('active');
      });

      allMenus.forEach((menu) => {
        menu.classList.remove('show-menu');
      });

      const clickedDay = document.querySelector('a[href="#' + dayName + '"]');

      const clickedMenu = document.getElementById(dayName);

      clickedDay.classList.add('active');
      clickedMenu.classList.add('show-menu');
    });
  });
}

/**
 * Returns the correct for of the month.
 *
 * @param {string} month - the month from the API.
 *
 * @returns {String} - the month in correct form or unknown.
 */
function getMonth(month) {
  const months = {
    tammikuuta: 'tammikuu',
    helmikuuta: 'helmikuu',
    maaliskuuta: 'maaliskuu',
    huhtikuuta: 'huhtikuu',
    toukokuuta: 'toukokuu',
    kesäkuuta: 'kesäkuu',
    heinäkuuta: 'heinäkuu',
    elokuuta: 'elokuu',
    syyskuuta: 'syyskuu',
    lokakuuta: 'lokakuu',
    marraskuuta: 'marraskuu',
    joulukuuta: 'joulukuu',
  };

  return months[month] || 'ei tiedossa kuukautta.';
}

/**
 * Fetches the weekly menu for a restaurant from the REST API.
 *
 * @param {string} restaurantId - the ID of the restaurant.
 *
 * @returns {Promise<Object>} - the restaurant's weekly menu.
 */
async function getWeeklyMenu(restaurantId) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/' +
        restaurantId +
        '/fi'
    );

    if (!response.ok) {
      throw new Error('Unable to fetch weekly menu!');
    }

    const weeklyMenu = await response.json();

    return weeklyMenu;
  } catch (error) {
    console.log('Failed to fetch weekly menu: ', error);
    throw error;
  }
}

createWeeklyMenu();
