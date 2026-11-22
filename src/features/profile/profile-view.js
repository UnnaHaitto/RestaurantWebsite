/**
 * Stores references to the user page's DOM elements.
 */
const elements = {
  image: document.getElementById('image'),
  input: document.getElementById('input'),

  username: document.getElementById('changeUsername'),
  password: document.getElementById('changePassword'),
  email: document.getElementById('changeMail'),

  passwordError: document.getElementById('changePasswordError'),
  emailError: document.getElementById('changeMailError'),
  usernameError: document.getElementById('changeUsernameError'),
  errorContainer: document.getElementById('changeError'),

  data: document.getElementById('data-field'),
  usernameCotainer: document.getElementById('username'),
  emailContainer: document.getElementById('mail'),

  changeButton: document.getElementById('changeButton'),
  logoutButton: document.getElementById('logout-link'),
};

/**
 * Displays the favourite restaurant on the page.
 *
 * @param {Object} restaurant - The favourite restaurant object.
 */
function displayRestaurant(restaurant) {
  const container = document.getElementById('user-favourite-food-container');

  let html = '';

  if (!restaurant) {
    container.innerHTML = '<h1>Ei lempi ravintolaa.</h1>';
    return;
  }

  html += '<div class="restaurants">';
  html += '<div class="food-image-container">';
  html +=
    '<img src="../../../public/images/restaurant.jpeg" alt="Kuva ravintolasta" />';
  html += '</div>';
  html += '<div class="container">';
  html += '<div class="restaurant-info">';
  html += '<h2>' + restaurant.name + '</h2>';
  html += '<p>' + restaurant.company + '</p>';
  html += '</div>';
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

  container.innerHTML = html;
}

/**
 * Displays the user's profile information on the page.
 *
 * @param {Object} userData - The user's profile information.
 */
function displayUserData(userData) {
  const avatar = userData.avatar
    ? 'https://media2.edu.metropolia.fi/restaurant/uploads/' + userData.avatar
    : '../../../public/images/avatar.png';

  elements.image.src = avatar;

  elements.usernameCotainer.innerText = userData.username;
  elements.emailContainer.innerText = userData.email;
}

/**
 * Displays an error message.
 *
 * @param {String} message - The error message to display.
 */
function displayError(message) {
  elements.errorContainer.innerText = message;
}

/**
 * Displays a message related to image uploading.
 *
 * @param {String} message - The message to display.
 */
function displayImageMessage(message) {
  elements.data.innerText = message;
}

/**
 * Displays validation errors on their perspective fields.
 *
 * @param {String} field - The input field being validated.
 * @param {String} message - The validation error message.
 */
function displayValidationError(field, message) {
  elements[field].innerText = message;
}

/**
 * Checks whether all validation error messages are empty.
 *
 * @returns {Boolean} - Whether the form has no validation errors.
 */
function noErrors() {
  return (
    elements.passwordError.innerText === '' &&
    elements.usernameError.innerText === '' &&
    elements.emailError.innerText === ''
  );
}

/**
 * Gets the new user information from the input fields.
 *
 * @returns {Object} - The new user information.
 */
function getUserInput() {
  return {
    username: elements.username.value,
    password: elements.password.value,
    email: elements.email.value,
  };
}

/**
 * Clears the user input fields after a successfull update.
 */
function clearUserInput() {
  elements.username.value = '';
  elements.password.value = '';
  elements.email.value = '';
}

/**
 * Clears the general error message.
 */
function clearError() {
  elements.errorContainer.innerText = '';
}

/**
 * Listenes for daily and weekly menu clicks.
 *
 * @param {Function} handler - Callback function receiving the menu type, value and name.
 */
function bindMenuEvents(handler) {
  const container = document.querySelector('#user-favourite-food-container');

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
  elements,
  displayRestaurant,
  displayUserData,
  displayError,
  displayImageMessage,
  displayValidationError,
  noErrors,
  getUserInput,
  clearUserInput,
  clearError,
  bindMenuEvents,
};
