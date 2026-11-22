function setRestaurantName(name) {
  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = name;
}

function setMonth(month) {
  const monthContainer = document.querySelector('.month');

  month !== ''
    ? (monthContainer.innerText = month)
    : (monthContainer.innerHTML = '<h1>Ei voitu hakea kuukautta</h1>');
}

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
