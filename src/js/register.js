import {validateUsername, validatePassword, validateEmail} from './validation';

const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const email = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('mailError');

password.addEventListener('input', () => {
  passwordError.innerText = validatePassword(password.value);
});
username.addEventListener('input', () => {
  usernameError.innerText = validateUsername(username.value);
});
email.addEventListener('input', () => {
  emailError.innerText = validateEmail(email.value);
});

/**
 * Check whether the error fields have any errors.
 */
function noErrors() {
  return (
    usernameError.innerText === '' &&
    passwordError.innerText === '' &&
    emailError.innerText === ''
  );
}

/**
 * Checks whether the username is available.
 *
 * @param {string} username - the users input username.
 *
 * @returns {Promise<Boolean>} - wether the username is available.
 */
async function isCreationPossible(username) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/' +
        username
    );

    if (!response.ok) {
      console.log('User availability check failed!');
      return false;
    }

    const json = await response.json();

    return json.available;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

/**
 * Posts the user data to the REST API users.
 *
 * @param {string} username - the users given username.
 * @param {string} password - the users given password.
 * @param {string} email - the users given email.
 *
 * @returns {Promise<Boolean>} - whether the login was successfull.
 */
async function createUser(username, password, email) {
  const data = {
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
      data
    );

    if (!response.ok) {
      const error = await response.json();
      console.log('Registration failed:', error);
      return false;
    }

    const userData = await response.json();

    console.log('result: ', userData);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}

const registerForm = document.getElementById('register-form');

/**
 * Listens for the submit event of the register form.
 * Checks whether there are errors.
 * If not, checks if the username is available.
 * If it is, tries creating the user and moving them to login.
 * Else shows appropriate error messages.
 *
 * @param {SubmitEvent} event - the form submission event object.
 */
registerForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const usernameValue = username.value;
  const passwordValue = password.value;
  const emailValue = email.value;

  usernameError.innerText = validateUsername(usernameValue);
  passwordError.innerText = validatePassword(passwordValue);
  emailError.innerText = validateEmail(emailValue);

  const registerError = document.getElementById('registerError');

  if (!noErrors()) {
    registerError.innerText = 'Pitää ensin selvittää ongelmat';
    return;
  }

  registerError.innerText = '';

  const isPossible = await isCreationPossible(usernameValue);

  if (!isPossible) {
    registerError.innerText = 'Käyttäjä on varattu';
    return;
  }

  const created = await createUser(usernameValue, passwordValue, emailValue);

  if (!created) {
    registerError.innerText = 'Käyttäjän luominen ei onnistu';
    return;
  }

  location.href = './login.html';
});
