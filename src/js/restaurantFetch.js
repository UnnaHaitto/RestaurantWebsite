export let restaurants = [];

// Caches the fetch promise to prevent unnecessary API requests.
let restaurantPromise = null;

/**
 * Fetches all restaurants from the REST API.
 * Caches the promise to avoid duplicate requests.
 *
 * @returns {Promise<Array>} The fetched restaurants.
 */
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
      throw error;
    }
  })();

  return restaurantPromise;
}
