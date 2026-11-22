import {apiUrl} from '../api/api.js';

async function saveRestaurantToLiked(restaurantId, token) {
  //Imports the liked restaurant to the users liked restaurants

  const data = {
    body: JSON.stringify({
      favouriteRestaurant: restaurantId,
    }),
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-type': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl + '/users', data);

    if (!response.ok) {
      const error = await response.json();
      console.log('error: ', error);
      return false;
    }

    return true;
  } catch (error) {
    console.log('Failed to save restaurant to favourites: ', error);

    return false;
  }
}

export {saveRestaurantToLiked};
