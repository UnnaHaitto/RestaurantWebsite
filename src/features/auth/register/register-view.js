const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const email = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('mailError');

const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('registerError');

function getRegisterInput() {
  return {
    username: username.value,
    password: password.value,
    email: email.value,
  };
}

function showValidationErrors(errors) {
  usernameError.innerText = errors.username;
  passwordError.innerText = errors.password;
  emailError.innerText = errors.email;
}

function showRegisterError(message) {
  registerError.innerText = message;
}

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
