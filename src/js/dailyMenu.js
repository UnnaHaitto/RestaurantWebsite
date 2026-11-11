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
