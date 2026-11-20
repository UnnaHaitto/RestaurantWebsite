const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('loginError');

/**
 * Gets the username and password from the form.
 *
 * @returns {object} - The user data object.
 */
function getLoginInput() {
  return {
    username: document.getElementById('loginUsername').value,
    password: document.getElementById('loginPassword').value,
  };
}

/**
 * Displays an error message.
 *
 * @param {String} message
 */
function showError(message) {
  loginError.innerText = message;
}

/**
 * Clears the error messages.
 */
function clearError() {
  loginError.innerText = '';
}

/**
 * Adds submit event listener to the login form.
 *
 * @param {Function} handler
 */
function bindLoginSubmit(handler) {
  loginForm.addEventListener('submit', handler);
}

export {getLoginInput, showError, clearError, bindLoginSubmit};
