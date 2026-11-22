/**
 * Displays the selected restaurant's name.
 *
 * @param {String} restaurantName - The name of the selected restaurant.
 */
const displayRestaurantName = (restaurantName) => {
  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = restaurantName;
};

/**
 * Dsiplays the daily menu.
 *
 * @param {Object} dailyMenu - The daily menu data.
 */
const displayDailyMenu = (dailyMenu) => {
  const menuContainer = document.querySelector('#daily-menu-container');

  let html = '';

  if (dailyMenu.courses.length === 0) {
    menuContainer.innerHTML = '<h1>Ei päivän menua.</h1>';
    return;
  }

  for (let i = 0; i < dailyMenu.courses.length; i++) {
    const diets = dailyMenu.courses[i].diets;

    html +=
      '<div id="daily-food-items-container" class="food-items-container">';
    html += '<div class="food-container">';
    html += '<div class="food-data-container">';
    html += '<p class="food-name">' + dailyMenu.courses[i].name + '</p>';
    html += '<p class="food-price">' + dailyMenu.courses[i].price + '</p>';
    html += '</div>';
    if (diets) {
      html += '<p class="allergen-info">' + diets + '</p>';
    }
    html += '</div>';
    html += '</div>';
  }

  menuContainer.innerHTML = html;
};

export {displayDailyMenu, displayRestaurantName};
