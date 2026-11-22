const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const email = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('mailError');

const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('registerError');

/**
 * Gets the values from the registration form.
 *
 * @returns {Object} - Input user data.
 */
function getRegisterInput() {
  return {
    username: username.value,
    password: password.value,
    email: email.value,
  };
}

/**
 * Dsiplays validation errors.
 *
 * @param {Object} errors - The validation errors for the fields.
 */
function showValidationErrors(errors) {
  if (errors.username !== undefined) {
    usernameError.innerText = errors.username;
  }

  if (errors.password !== undefined) {
    passwordError.innerText = errors.password;
  }

  if (errors.email !== undefined) {
    emailError.innerText = errors.email;
  }
}

/**
 * Displays the general registeration error.
 *
 * @param {String} message - The registration error message.
 */
function showRegisterError(message) {
  registerError.innerText = message;
}

/**
 * Adds input event listeners.
 *
 * @param {Function} handler
 */
function bindInputEvents(handler) {
  username.addEventListener('input', () => {
    handler('username', username.value);
  });

  password.addEventListener('input', () => {
    handler('password', password.value);
  });

  email.addEventListener('input', () => {
    handler('email', email.value);
  });
}

/**
 * Adds submit event listeners.
 *
 * @param {Function} handler
 */
function bindRegisterSubmit(handler) {
  registerForm.addEventListener('submit', handler);
}

export {
  getRegisterInput,
  showRegisterError,
  showValidationErrors,
  bindInputEvents,
  bindRegisterSubmit,
};
