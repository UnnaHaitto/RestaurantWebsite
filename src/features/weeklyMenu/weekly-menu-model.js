import {apiUrl} from '../../shared/api/api.js';

/**
 * Fetches the weekly menu for a restaurant from the REST API.
 *
 * @param {string} restaurantId - the ID of the restaurant.
 *
 * @returns {Promise<Object>} - the restaurant's weekly menu.
 */
async function getWeeklyMenu(restaurantId) {
  const response = await fetch(
    apiUrl + '/restaurants/weekly/' + restaurantId + '/fi'
  );

  if (!response.ok) {
    throw new Error('Unable to fetch weekly menu!');
  }

  const weeklyMenu = await response.json();

  return weeklyMenu;
}

/**
 * Returns the correct for of the month.
 *
 * @param {string} month - the month from the API.
 *
 * @returns {String} - the month in correct form or unknown.
 */
function getMonth(month) {
  const months = {
    tammikuuta: 'tammikuu',
    helmikuuta: 'helmikuu',
    maaliskuuta: 'maaliskuu',
    huhtikuuta: 'huhtikuu',
    toukokuuta: 'toukokuu',
    kesäkuuta: 'kesäkuu',
    heinäkuuta: 'heinäkuu',
    elokuuta: 'elokuu',
    syyskuuta: 'syyskuu',
    lokakuuta: 'lokakuu',
    marraskuuta: 'marraskuu',
    joulukuuta: 'joulukuu',
  };

  return months[month] || 'Ei tiedossa kuukautta.';
}

export {getWeeklyMenu, getMonth};
