const image = document.getElementById('image');
const input = document.getElementById('input');
let file = '';
const token = sessionStorage.getItem('token');

console.log('retrieved token: ', token);

console.log(window.location.origin);

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

  console.log('User data:', data.avatar);

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

function logout() {
  sessionStorage.clear();
  window.location.href = './main.html';
}

const logoutButton = document.getElementById('logout-link');

logoutButton.addEventListener('click', function (event) {
  logout();
});
