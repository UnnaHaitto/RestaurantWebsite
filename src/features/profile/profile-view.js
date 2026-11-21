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
 * Dsiplays the user's profile information on the page.
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

export {
  elements,
  displayUserData,
  displayError,
  displayImageMessage,
  displayValidationError,
  noErrors,
  getUserInput,
  clearUserInput,
  clearError,
};
