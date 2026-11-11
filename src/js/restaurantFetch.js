export let restaurants = [];

let restaurantPromise = null;

export async function fetchRestaurants() {
  if (restaurantPromise) {
    return restaurantPromise;
  }

  restaurantPromise = (async () => {
    try {
      const response = await fetch(
        'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
      );

      if (!response.ok) {
        throw new Error('Unable to fetch restaurants!');
      }

      restaurants = await response.json();

      return restaurants;
    } catch (error) {
      restaurantPromise = null;
      console.log(error.message);
    }
  })();

  return restaurantPromise;
}
