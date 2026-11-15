const image = document.getElementById('image');
const input = document.getElementById('input');
let file = '';
const token = sessionStorage.getItem('token');

const username = document.getElementById('changeUsername');
const password = document.getElementById('changePassword');
const mail = document.getElementById('changeMail');

const passwordError = document.getElementById('changePasswordError');
const mailError = document.getElementById('changeMailError');
const errorContainer = document.getElementById('changeError');

function validatePassword(password) {
  html = '';
  if (password.value.length === 0) {
    passwordError.innerText = '';
    return;
  }

  if (password.value.length > 0 && password.value.length < 5) {
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

function validateMail(mail) {
  html = '';

  if (mail.value.length === 0) {
    mailError.innerText = '';
    return;
  }

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

if (token) {
  addDataToPage();
} else {
  window.location.href = './main.html';
}

input.addEventListener('change', async function (event) {
  event.preventDefault();

  const data = document.getElementById('data-field');

  file = input.files[0];

  //image.src = URL.createObjectURL(file);

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
  data = await fetchUserData();

  //console.log('User data:', data.avatar);

  image.src =
    'https://media2.edu.metropolia.fi/restaurant/uploads/' + data.avatar;

  usernameCotainer = document.getElementById('username');
  mailContainer = document.getElementById('mail');

  usernameCotainer.innerText = data.username;
  mailContainer.innerText = data.email;
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

    //const json = await response.json();

    //console.log('result: ', json);

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
  const username = document.getElementById('changeUsername').value;
  const password = document.getElementById('changePassword').value;
  const mail = document.getElementById('changeMail').value;

  console.log(username, password, mail);

  let updateData = {};

  if (username !== '') {
    updateData.username = username;
  }

  if (password !== '') {
    updateData.password = password;
  }

  if (mail !== '') {
    updateData.email = mail;
  }

  let isPossible = false;

  if (username === '') {
    isPossible = true;
  } else {
    isPossible = await isCreationPossible(username);
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

  if (noErrors) {
    await updateUserInfo();

    await addDataToPage();
  } else {
    errorContainer = 'Selvitä ensin kaikki ongelmat';
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
