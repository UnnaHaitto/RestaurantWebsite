const image = document.getElementById('image');
const input = document.getElementById('input');
const token = sessionStorage.getItem('token');

console.log('retrieved token: ', token);

console.log(window.location.origin);

input.addEventListener('change', function (event) {
  image.src = URL.createObjectURL(input.files[0]);
});

addDataToPage();

if (token) {
  async function addDataToPage() {
    data = await fetchUserData();

    usernameCotainer = document.getElementById('username');
    mailContainer = document.getElementById('mail');

    usernameCotainer.innerText = data.username;
    mailContainer.innerText = data.email;
  }
} else {
  window.location.href = './main.html';
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

function logout() {
  sessionStorage.clear();
  window.location.href = './main.html';
}

const logoutButton = document.getElementById('logout-link');

logoutButton.addEventListener('click', function (event) {
  event.preventDefault();

  logout();
});
