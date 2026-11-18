import {validateEmail, validatePassword} from './validation.js';

const image = document.getElementById('image');
const input = document.getElementById('input');
let file = '';
const token = sessionStorage.getItem('token');

const username = document.getElementById('changeUsername');
const password = document.getElementById('changePassword');
const email = document.getElementById('changeMail');

const passwordError = document.getElementById('changePasswordError');
const emailError = document.getElementById('changeMailError');
const errorContainer = document.getElementById('changeError');

password.addEventListener('input', () => {
  passwordError.innerText = validatePassword(password.value, false);
});

email.addEventListener('input', () => {
  emailError.innerText = validateEmail(email.value, false);
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

  file = input.files[0];

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

  image.src =
    'https://media2.edu.metropolia.fi/restaurant/uploads/' + data.avatar;

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

    console.log(userData);

    return userData;
  } catch (error) {
    console.log(error.message);
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

    console.log(json);
    console.log(json.available);

    return json.available;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateUserInfo() {
  const givenUsername = document.getElementById('changeUsername').value;
  const givenPassword = document.getElementById('changePassword').value;
  const givenEmail = document.getElementById('changeMail').value;

  console.log(givenUsername, givenPassword, givenEmail);

  let updateData = {};

  if (givenUsername !== '') {
    updateData.username = givenUsername;
  }

  if (givenPassword !== '') {
    updateData.password = givenPassword;
  }

  if (givenEmail !== '') {
    updateData.email = givenEmail;
  }

  let isPossible = false;

  if (givenUsername === '') {
    isPossible = true;
  } else {
    isPossible = await isCreationPossible(givenUsername);
  }

  if (isPossible) {
    errorContainer.innerText = '';

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

      if (!response.ok) throw new Error('Invalid input!');

      const json = await response.json();
      console.log('result', json);

      username.value = '';
      email.value = '';
      password.value = '';
    } catch (e) {
      console.log('error', e);
      errorContainer.innerText = 'Käyttäjän tietojen päivittäminen epäonnistui';
    }
  } else {
    errorContainer.innerText = 'Käyttäjänimi ei ole vapaana';
  }
}

const changeButton = document.getElementById('changeButton');

changeButton.addEventListener('click', async function (event) {
  event.preventDefault();

  if (noErrors()) {
    await updateUserInfo();

    await addDataToPage();
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
