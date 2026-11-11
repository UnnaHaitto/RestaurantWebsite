export let restaurants = [];

// Stores fetched promise so the restaurants have to be fetched only once
let restaurantPromise = null;

// Fetches the restaurants from the API
export async function fetchRestaurants() {
  // If restaurants are already fetched or are being fetched it returns them
  if (restaurantPromise) {
    return restaurantPromise;
  }

  // Creates and stores a promise for fetching the restaurants
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

  // returns the promise containing the fetched restaurants
  return restaurantPromise;
}
