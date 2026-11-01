const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    if (button.innerText == '♡') {
      button.innerText = '♥';
    } else {
      button.innerText = '♡';
    }
  });
});

document.getElementById('login-button').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    window.location.href = '../pages/userPage.html';
  } else {
    alert('Virheellinen käyttäjätunnus tai salasana.');
  }
});

var map = L.map('map').setView([60.188222, 24.829696], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
