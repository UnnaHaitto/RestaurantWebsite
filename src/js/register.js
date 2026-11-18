const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const email = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('mailError');

/**
 * Checks whether the password is valid.
 * If not valid, sets errors to password error field.
 * Otherwise, clears error field.
 *
 * @param {HTMLInputElement} password - the password input element.
 *
 */
function validatePassword(password) {
  let error = '';
  if (password.value.length < 5) {
    error += ' Salasanan pitää olla ainakin 5 merkkiä pitkä ';
  } else if (!/[a-z]/.test(password.value)) {
    error += ' Salasanan pitää sisältää pieniä kirjaimia ';
  } else if (!/[A-Z]/.test(password.value)) {
    error += ' Salasanan pitää sisältää isoja kirjaimia ';
  } else if (!/[0-9]/.test(password.value)) {
    error += ' Salasanan pitää sisältää numeroita ';
  } else if (!/[^a-zA-Z0-9]/.test(password.value)) {
    error += ' Salasanan pitää sisältää erikoismerkkejä ';
  } else {
    error = '';
  }

  passwordError.innerText = error;
}

/**
 * Checks whether the username is given.
 * If not, sets errors to username error field.
 * Otherwise, clears error field.
 *
 * @param {HTMLInputElement} username - the username input element.
 *
 */
function validateUsername(username) {
  const error = username.value.length === 0 ? 'Pitää antaa käyttäjä nimi' : '';

  usernameError.innerText = error;
}

/**
 * Checks whether the email is valid email.
 * If not valid, sets errors to email error field.
 * Otherwise, clears error field.
 *
 * @param {HTMLInputElement} email - the email input element.
 *
 */
function validateMail(email) {
  const error =
    email.value.length <= 0 ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
      ? 'Pitää antaa kelvollinen sähköpostiosoite'
      : '';

  emailError.innerText = error;
}

password.addEventListener('input', () => validatePassword(password));
username.addEventListener('input', () => validateUsername(username));
email.addEventListener('input', () => validateMail(email));

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

  const registerError = document.getElementById('registerError');

  validateUsername(username);
  validatePassword(password);
  validateMail(email);

  if (!noErrors()) {
    registerError.innerText = 'Pitää ensin selvittää ongelmat';
    return;
  }

  registerError.innerText = '';

  const usernameValue = username.value;
  const passwordValue = password.value;
  const mailValue = email.value;

  const isPossible = await isCreationPossible(usernameValue);

  if (!isPossible) {
    registerError.innerText = 'Käyttäjä on varattu';
    return;
  }

  const created = await createUser(usernameValue, passwordValue, mailValue);

  if (!created) {
    registerError.innerText = 'Käyttäjän luominen ei onnistu';
    return;
  }

  location.href = './login.html';
});
