import {
  validateUsername,
  validateEmail,
  validatePassword,
} from '../../../shared/validation/validation.js';

import {isCreationPossible} from '../../../shared/usernameCheck/usernameCheck.js';

import {createUser} from './register-model.js';

import {
  getRegisterInput,
  showValidationErrors,
  showRegisterError,
  bindInputEvents,
  bindRegisterSubmit,
} from './register-view.js';

import {createHeader} from '../../../shared/headerController/header-controller.js';

/**
 * Handles validation when the user types.
 *
 * @param {String} field - The name of the field being validated.
 * @param {String} value - The current input value of the field.
 */
function handleInput(field, value) {
  const validators = {
    username: validateUsername,
    password: validatePassword,
    email: validateEmail,
  };

  const error = validators[field](value);

  showValidationErrors({
    [field]: error,
  });
}

/**
 * Validates all registration fields.
 *
 * @param {Object} input - The registration form input values.
 * @returns {boolean} - If all registration fields are valid.
 */
function validateRegisteration(input) {
  const errors = {
    username: validateUsername(input.username),
    password: validatePassword(input.password),
    email: validateEmail(input.email),
  };

  showValidationErrors(errors);

  return (
    errors.username === '' && errors.password === '' && errors.email === ''
  );
}

/**
 * Handles registration form submission.
 *
 * @param {SubmitEvent} event - Registration form submit event.
 */
async function handleRegister(event) {
  event.preventDefault();

  const input = getRegisterInput();

  if (!validateRegisteration(input)) {
    showRegisterError('Pitää ensin selvittää ongelmat.');
    return;
  }

  showRegisterError('');

  const isPossible = await isCreationPossible(input.username);

  if (!isPossible) {
    showRegisterError('Käyttäjä on varattu!');
    return;
  }

  const created = await createUser(input.username, input.password, input.email);

  if (!created) {
    showRegisterError('Käyttäjän luominen ei onnistu!');
    return;
  }

  location.href = '../../../../public/login.html';
}

/**
 * Initializes registration functionality.
 */
function initRegisterController() {
  createHeader();

  bindInputEvents(handleInput);
  bindRegisterSubmit(handleRegister);
}

export {initRegisterController};
