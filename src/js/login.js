document.getElementById('login-button').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    window.location.href = '../pages/userPage.html';
  } else {
    alert('Virheellinen käyttäjätunnus tai salasana.');
  }
});
