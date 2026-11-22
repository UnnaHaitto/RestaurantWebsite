const pagination = document.querySelector('.pagination');
const container = document.querySelector('.restaurant-container');

const token = sessionStorage.getItem('token');

const likedRestaurant = sessionStorage.getItem('liked-restaurant');

/**
 * Displays restaurants on the page.
 *
 * @param {Array} restaurants - All the restaurants from the API.
 */
function displayRestaurants(restaurants) {
  let html = '';

  if (!restaurants) {
    container.innerHTML = '<h1>Ei voitu hakea ravintoloita</h1>';
  }

  // Goes through each restaurant on the current page
  for (let restaurant of restaurants) {
    html += '<div class="restaurants">';
    html += '<div class="food-image-container">';
    html +=
      '<img src="/~unnah/public/images/restaurant.jpeg" alt="Kuva ravintolasta" />';
    html += '</div>';
    html += '<div class="container">';
    html += '<div class="restaurant-info">';
    html += '<h2>' + restaurant.name + '</h2>';
    html += '<p>' + restaurant.company + '</p>';
    html += '</div>';
    if (token) {
      html += '<div class="like-button-container">';
      html +=
        '<p class="like-button" data-value="' +
        restaurant._id +
        '">' +
        (likedRestaurant === restaurant._id ? '♥' : '♡') +
        '</p>';

      html += '</div>';
    }
    html += '</div>';
    html += '<div class="restaurant-info-container">';
    html +=
      '<p>Osoite: ' + restaurant.city + ', ' + restaurant.postalCode + '</p>';
    html += '<p>Puhelinnumero: ' + restaurant.phone + '</p>';
    html += '</div>';
    html += '<div class="restaurant-menu-container">';
    html +=
      '<a href="" class="daily-menu" data-value="' +
      restaurant._id +
      '" data-name="' +
      restaurant.name +
      '">Päivän menu</a>';
    html +=
      '<a href="" class="weekly-menu" data-value="' +
      restaurant._id +
      '" data-name="' +
      restaurant.name +
      '">Viikon menu</a>';
    html += '</div>';
    html += '</div>';
  }

  container.innerHTML = html;
}

/**
 * Displays pagination buttons.
 *
 * @param {number} currentPage - The current page the user is on.
 * @param {number} totalPages - The total number of pages.
 */
function displayPagination(currentPage, totalPages) {
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  // Calculates the first and last page to display
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  let html = '';

  html += '<a href="#" data-page="' + (currentPage - 1) + '">&laquo;</a>';

  // Shows two pages before and after current page if possible
  for (let i = start; i <= end; i++) {
    html +=
      '<a href="#" data-page="' +
      i +
      '" class="' +
      (currentPage === i ? 'active' : '') +
      '">' +
      i +
      '</a>';
  }

  html += '<a href="#" data-page="' + (currentPage + 1) + '">&raquo;</a>';

  pagination.innerHTML = html;
}

/**
 * Listenes for pagination clicks.
 *
 * @param {Function} handler - Callback function receiving the selected page number.
 */
function bindPaginationEvents(handler) {
  pagination.addEventListener('click', function (event) {
    const link = event.target.closest('[data-page]');

    if (!link) return;

    event.preventDefault();

    const page = Number(link.dataset.page);

    handler(page);
  });
}

/**
 * Listenes for daily and weekly menu clicks.
 *
 * @param {Function} handler - Callback function receiving the menu type, value and name.
 */
function bindMenuEvents(handler) {
  container.addEventListener('click', function (event) {
    const link = event.target.closest('.daily-menu, .weekly-menu');

    if (!link) return;

    event.preventDefault();

    handler(
      link.classList.contains('daily-menu') ? 'daily' : 'weekly',
      link.dataset.value,
      link.dataset.name
    );
  });
}

export {
  displayPagination,
  displayRestaurants,
  bindMenuEvents,
  bindPaginationEvents,
};
