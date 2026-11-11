const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

//console.log(restaurantId, restaurantName);

async function createMenu() {
  const dailyMenu = await getDailyMenu(restaurantId);

  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = restaurantName;

  console.log(dailyMenu);

  const menuContainer = document.querySelector('#daily-menu-container');

  let html = '';

  /*
          <div class="food-container">
          <div class="food-data-container">
            <p class="food-name">Ruokalaji</p>
            <p class="food-description">Kuvaus</p>
            <p class="food-price">Hinta</p>
          </div>
          <p class="allergen-info">Allergiatiedot</p>
        </div>*/

  for (let i = 0; i < dailyMenu.courses.length; i++) {
    //console.log(dailyMenu.courses[i].name);

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
