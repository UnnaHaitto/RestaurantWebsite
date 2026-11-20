const displayRestaurantName = (restaurantName) => {
  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = restaurantName;
};

const displayDailyMenu = (dailyMenu) => {
  const menuContainer = document.querySelector('#daily-menu-container');

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
};

export {displayDailyMenu, displayRestaurantName};
