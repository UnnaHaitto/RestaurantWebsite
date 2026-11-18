const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const mail = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const mailError = document.getElementById('mailError');

/**
 * Checks whether the password is valid.
 * If not valid, sets errors to password error field.
 * Otherwise, clears error field.
 *
 * @param {string} password - the users input password.
 *
 */
function validatePassword(password) {
  let html = '';
  if (password.value.length < 5) {
    html += ' Salasanan pitää olla ainakin 5 merkkiä pitkä ';
  } else if (!/[a-z]/.test(password.value)) {
    html += ' Salasanan pitää sisältää pieniä kirjaimia ';
  } else if (!/[A-Z]/.test(password.value)) {
    html += ' Salasanan pitää sisältää isoja kirjaimia ';
  } else if (!/[0-9]/.test(password.value)) {
    html += ' Salasanan pitää sisältää numeroita ';
  } else if (!/[^a-zA-Z0-9]/.test(password.value)) {
    html += ' Salasanan pitää sisältää erikoismerkkejä ';
  } else {
    html = '';
  }

  passwordError.innerText = html;
}

/**
 * Checks whether the username is given.
 * If not, sets errors to username error field.
 * Otherwise, clears error field.
 *
 * @param {string} username - the users input username.
 *
 */
function validateUsername(username) {
  let html = '';
  if (username.value.length <= 0) {
    html += 'Pitää antaa käyttäjä nimi';
  } else {
    html = '';
  }

  usernameError.innerText = html;
}

/**
 * Checks whether the email is valid email.
 * If not valid, sets errors to email error field.
 * Otherwise, clears error field.
 *
 * @param {string} mail - the users input email.
 *
 */
function validateMail(mail) {
  let html = '';
  if (
    mail.value.length <= 0 ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail.value)
  ) {
    html += 'Pitää antaa kelvollinen sähköpostiosoite';
  } else {
    html = '';
  }

  mailError.innerText = html;
}

password.addEventListener('input', () => validatePassword(password));
username.addEventListener('input', () => validateUsername(username));
mail.addEventListener('input', () => validateMail(mail));

/**
 * Check whether the error fields have any errors.
 */
function noErrors() {
  if (
    usernameError.innerText === '' &&
    passwordError.innerText === '' &&
    mailError.innerText === ''
  ) {
    return true;
  }

  return false;
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
  }
}

/**
 * Posts the user data to the REST API users.
 *
 * @param {string} username - the users given username.
 * @param {string} password - the users given password.
 * @param {string} mail - the users given email.
 *
 * @returns {Promise<Boolean>} - whether the login was successfull.
 */
async function createUser(username, password, mail) {
  const data = {
    body: JSON.stringify({
      username: username,
      password: password,
      email: mail,
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
  validateMail(mail);

  if (noErrors()) {
    registerError.innerText = '';

    const usernameValue = document.getElementById('registerUsername').value;

    const isPossible = await isCreationPossible(usernameValue);

    if (isPossible) {
      const passwordValue = document.getElementById('registerPassword').value;
      const mailValue = document.getElementById('registerMail').value;

      if (!(await createUser(usernameValue, passwordValue, mailValue))) {
        registerError.innerText = 'Käyttäjän luominen ei onnistu';
        return;
      } else {
        location.href = './login.html';
      }
    } else {
      registerError.innerText = 'Käyttäjä on varattu';
      return;
    }
  } else {
    registerError.innerText = 'Pitää ensin selvittää ongelmat';
    return;
  }
});
