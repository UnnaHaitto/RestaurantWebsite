const username = document.getElementById('registerUsername');
const password = document.getElementById('registerPassword');
const mail = document.getElementById('registerMail');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const mailError = document.getElementById('mailError');

function validatePassword(password) {
  html = '';
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

function validateUsername(username) {
  html = '';
  if (username.value.length <= 0) {
    html += 'Pitää antaa käyttäjä nimi';
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
    html += 'Pitää antaa kelvollinen sähköpostiosoite';
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
