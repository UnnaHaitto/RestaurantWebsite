async function getWeeklyMenu(id) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/' +
        id +
        '/fi'
    );

    if (!response.ok) {
      throw new Error('Unable to fetch daily menu!');
    }

    const weeklyMenu = await response.json();

    return weeklyMenu;
  } catch (error) {
    console.log(error.message);
  }
}
