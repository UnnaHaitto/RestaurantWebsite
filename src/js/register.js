const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const mail = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const mailError = document.getElementById('mailError');

function validatePassword(password) {
  html = '';
  if (password.value.length < 5) {
    html += ' password must be atleast 5 characters long ';
  } else if (!/[a-z]/.test(password.value)) {
    html += ' password must have lower case letters ';
  } else if (!/[A-Z]/.test(password.value)) {
    html += ' password must have upper case letters ';
  } else if (!/[0-9]/.test(password.value)) {
    html += ' password must have numbers ';
  } else if (!/[^a-zA-Z0-9]/.test(password.value)) {
    html += ' password must have special characters ';
  } else {
    html = '';
  }

  passwordError.innerText = html;
}

function validateUsername(username) {
  html = '';
  if (username.value.length <= 0) {
    html += 'Must give username';
  } else {
    html = '';
  }

  usernameError.innerText = html;
}

function validateMail(mail) {
  html = '';
  if (
    mail.value.length <= 0 ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail.value)
  ) {
    html += 'Must give a valid mail';
  } else {
    html = '';
  }

  mailError.innerText = html;
}

password.addEventListener('input', () => validatePassword(password));
username.addEventListener('input', () => validateUsername(username));
mail.addEventListener('input', () => validateMail(mail));

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
      console.log('error: ', error);
      throw new Error('Unable to create user!');
    }

    const json = await response.json();

    console.log('result: ', json);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}

async function isCreationPossible(username) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/' +
        username
    );

    if (!response.ok) {
      throw new Error('User availability check failed!');
    }

    const json = await response.json();

    console.log(json);
    console.log(json.available);

    return json.available;
  } catch (error) {
    console.log(error.message);
  }
}

const registerButton = document.getElementById('register-button');

registerButton.addEventListener('click', async function (event) {
  event.preventDefault();

  registerError = document.getElementById('registerError');

  validateUsername(username);
  validatePassword(password);
  validateMail(mail);

  if (noErrors()) {
    registerError.innerText = '';

    const usernameValue = document.getElementById('registerUsername').value;

    const isPossible = await isCreationPossible(usernameValue);

    console.log(isPossible);

    if (isPossible) {
      const passwordValue = document.getElementById('registerPassword').value;
      const mailValue = document.getElementById('registerMail').value;

      if (!(await createUser(usernameValue, passwordValue, mailValue))) {
        registerError.innerText = 'Unable to create user';
        return;
      } else {
        location.href = './userPage.html';
      }
    } else {
      registerError.innerText = 'Username is taken';
      return;
    }
  } else {
    registerError.innerText = 'Must first solve errors';
    return;
  }
});
