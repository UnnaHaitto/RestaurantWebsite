const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

/**
 * Fetches and displays the daily menu for the selected restaurant.
 *
 * Updates restaurant heading and creates HTML elements for each course in the daily menu.
 */
async function createMenu() {
  try {
    const dailyMenu = await getDailyMenu(restaurantId);

    const h1Container = document.querySelector('.restaurant-name');

    const menuContainer = document.querySelector('#daily-menu-container');

    h1Container.innerText = restaurantName;

    let html = '';

    for (let i = 0; i < dailyMenu.courses.length; i++) {
      html +=
        '<div id="daily-food-items-container" class="food-items-container">';
      html += '<div class="food-container">';
      html += '<div class="food-data-container">';
      html += '<p class="food-name">' + dailyMenu.courses[i].name + '</p>';
      html += '<p class="food-price">' + dailyMenu.courses[i].price + '</p>';
      html += '</div>';
      html += '<p class="allergen-info">';
      for (let restriction of dailyMenu.courses[i].diets) {
        html += restriction + ' ';
      }
      html += '</p>';
      html += '</div>';
      html += '</div>';
    }

    menuContainer.innerHTML = html;
  } catch (error) {
    console.log('Failed to display daily menu: ', error.message);
  }
}

/**
 * Fetches the daily menu for a restaurant from the REST API.
 *
 * @param {string} restaurantId - the ID of the restaurant.
 * @returns {Promise<Object>} - the restaurant's daily menu.
 */
async function getDailyMenu(restaurantId) {
  const response = await fetch(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/' +
      restaurantId +
      '/fi'
  );

  if (!response.ok) {
    throw new Error('Unable to fetch daily menu!');
  }

  const dailyMenu = await response.json();

  return dailyMenu;
}

createMenu();
