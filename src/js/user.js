import {
  validateEmail,
  validatePassword,
  validateUsername,
} from './validation.js';

const image = document.getElementById('image');
const input = document.getElementById('input');
const token = sessionStorage.getItem('token');

const username = document.getElementById('changeUsername');
const password = document.getElementById('changePassword');
const email = document.getElementById('changeMail');

const passwordError = document.getElementById('changePasswordError');
const emailError = document.getElementById('changeMailError');
const usernameError = document.getElementById('changeUsernameError');
const errorContainer = document.getElementById('changeError');

password.addEventListener('input', () => {
  passwordError.innerText = validatePassword(password.value, false);
});

email.addEventListener('input', () => {
  emailError.innerText = validateEmail(email.value, false);
});

username.addEventListener('input', () => {
  usernameError.innerText = validateUsername(username.value, false);
});

function noErrors() {
  return passwordError.innerText === '' && emailError.innerText === '';
}

if (token) {
  addDataToPage();
} else {
  window.location.href = './main.html';
}

input.addEventListener('change', async function (event) {
  event.preventDefault();

  const data = document.getElementById('data-field');

  const file = input.files[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    data.innerText = 'Kuva on liian iso';
    return;
  }

  if (await saveImage(file)) {
    data.innerText = 'Kuva tallennettu';
  } else {
    data.innerText = 'Kuvaa ei tallennettu';
  }

  await addDataToPage();
});

async function addDataToPage() {
  const data = await fetchUserData();

  const src = data.avatar
    ? 'https://media2.edu.metropolia.fi/restaurant/uploads/' + data.avatar
    : '../images/avatar.png';

  image.src = src;

  const usernameCotainer = document.getElementById('username');
  const emailContainer = document.getElementById('mail');

  usernameCotainer.innerText = data.username;
  emailContainer.innerText = data.email;
}

async function fetchUserData() {
  const data = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/token',
      data
    );

    if (!response.ok) {
      throw new Error('Unable to fetch user data!');
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    console.log('Failed to fetch user data:', error);
    throw error;
  }
}

async function saveImage(file) {
  const formData = new FormData();
  formData.append('avatar', file);

  const data = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/avatar',
      data
    );

    if (!response.ok) {
      const error = await response.json();
      console.log('error: ', error);
      return false;
    }

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

    return json.available;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateUserInfo() {
  const givenUsername = username.value;
  const givenPassword = password.value;
  const givenEmail = email.value;

  errorContainer.innerText = '';

  let updateData = {};

  if (givenUsername !== '') updateData.username = givenUsername;
  if (givenPassword !== '') updateData.password = givenPassword;
  if (givenEmail !== '') updateData.email = givenEmail;

  let isPossible = false;

  if (givenUsername === '') {
    isPossible = true;
  } else {
    isPossible = await isCreationPossible(givenUsername);
  }

  if (!isPossible) {
    errorContainer.innerText = 'Käyttäjänimi ei ole vapaana';
    return;
  }

  const data = {
    body: JSON.stringify(updateData),
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
      data
    );

    if (!response.ok) {
      const error = await response.text();

      console.error('Error updating user info:', response.status, error);

      return false;
    }

    username.value = '';
    email.value = '';
    password.value = '';
    return true;
  } catch (e) {
    console.log('error', e);
    errorContainer.innerText = 'Käyttäjän tietojen päivittäminen epäonnistui';
    return false;
  }
}

const changeButton = document.getElementById('changeButton');

changeButton.addEventListener('click', async function (event) {
  event.preventDefault();

  if (noErrors()) {
    const updated = await updateUserInfo();

    if (updated) {
      await addDataToPage();
    }
  } else {
    errorContainer.innerText = 'Selvitä ensin kaikki ongelmat';
  }
});

function logout() {
  sessionStorage.clear();
  window.location.href = './main.html';
}

const logoutButton = document.getElementById('logout-link');

logoutButton.addEventListener('click', function (event) {
  logout();
});
