const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

async function createWeeklyMenu() {
  const weeklyMenu = await getWeeklyMenu(restaurantId);

  const h1Container = document.querySelector('.restaurant-name');

  h1Container.innerText = restaurantName;

  const monthContainer = document.querySelector('.month');

  const date = weeklyMenu.days;

  let month = date[1].date.split('. ')[1];

  const monthName = getMonth(month);

  monthContainer.innerText = monthName;

  let days = [];
  let courses = [];

  //console.log(date);

  for (let day of date) {
    //console.log(day);

    days.push(day.date.split('. ')[0] + '.');

    courses.push(day.courses);
  }

  console.log(courses);

  //console.log(days);

  //console.log(weeklyMenu);
}

function getMonth(month) {
  switch (month) {
    case 'tammikuuta':
      return 'tammikuu';
    case 'helmikuuta':
      return 'helmikuu';
    case 'maaliskuuta':
      return 'maaliskuu';
    case 'huhtikuuta':
      return 'huhtikuu';
    case 'toukokuuta':
      return 'toukokuu';
    case 'kesäkuuta':
      return 'kesäkuu';
    case 'heinäkuuta':
      return 'heinäkuu';
    case 'elokuuta':
      return 'elokuu';
    case 'syyskuuta':
      return 'syyskuu';
    case 'lokakuuta':
      return 'lokakuu';
    case 'marraskuuta':
      return 'marraskuu';
    case 'joulukuuta':
      return 'joulukuu';
    default:
      return 'ei tiedossa kuukautta';
  }
}

async function getWeeklyMenu(id) {
  console.log(id);
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/' +
        id +
        '/fi'
    );

    if (!response.ok) {
      throw new Error('Unable to fetch weekly menu!');
    }

    const weeklyMenu = await response.json();

    return weeklyMenu;
  } catch (error) {
    console.log(error.message);
  }
}

createWeeklyMenu();
