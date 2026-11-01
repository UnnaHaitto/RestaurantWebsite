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

document.getElementById('loginButton').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    window.location.href = 'userPage.html';
  } else {
    alert('Virheellinen käyttäjätunnus tai salasana.');
  }
});
