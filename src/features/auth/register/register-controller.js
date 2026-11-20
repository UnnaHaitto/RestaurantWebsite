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

function handleInput(field, value) {
  const validators = {
    username: validateUsername,
    password: validatePassword,
    email: validateEmail,
  };

  const error = validators[field](value);

  showValidationErrors({
    username: field === 'username' ? error : '',
    password: field === 'password' ? error : '',
    email: field === 'email' ? error : '',
  });
}

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

  const created = createUser(input.username, input.password, input.email);

  if (!created) {
    showRegisterError('Käyttäjän luominen ei onnistu!');
    return;
  }

  location.href = '../../../../public/login.html';
}

function initRegisterController() {
  bindInputEvents(handleInput);
  bindRegisterSubmit(handleRegister);
}

export {initRegisterController};
