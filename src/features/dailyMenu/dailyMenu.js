import {createMenu} from './daily-menu-controller';

const parameters = location.search.split('&');

const restaurantId = parameters[0].split('=')[1];
const restaurantName = decodeURIComponent(parameters[1].split('=')[1]);

createMenu(restaurantId, restaurantName);
