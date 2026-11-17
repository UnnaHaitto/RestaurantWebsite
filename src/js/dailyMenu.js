const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

async function createMenu() {
  const dailyMenu = await getDailyMenu(restaurantId);

  const h1Container = document.querySelector('.restaurant-name');

  const menuContainer = document.querySelector('#daily-menu-container');

  h1Container.innerText = restaurantName;

  let html = '';

  for (let i = 0; i < dailyMenu.courses.length; i++) {
    html +=
      '<div id="daily-food-items-container" class="food-items-container>"';
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
}

async function getDailyMenu(id) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/' +
        id +
        '/fi'
    );

    if (!response.ok) {
      throw new Error('Unable to fetch daily menu!');
    }

    const dailyMenu = await response.json();

    return dailyMenu;
  } catch (error) {
    console.log(error.message);
  }
}

createMenu();
