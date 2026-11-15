const loginButton = document.getElementById('login-button');
let token = '';

loginButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');

  await login(username, password);

  if (await login(username, password)) {
    error.innerText = '';
    location.href = './userPage.html?token=' + token;
  } else {
    error.innerText = 'Kirjautuminen epäonnistui';
  }

  /*
  if (username === 'admin' && password === '1234') {
    window.location.href = '../pages/userPage.html';
  } else {
    alert('Virheellinen käyttäjätunnus tai salasana.');
  }*/
});

async function login(username, password) {
  const data = {
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login',
      data
    );

    if (!response.ok) {
      const error = await response.json();
      console.log('error: ', error);
      throw new Error('Unable to create user!');
    }

    const json = await response.json();

    console.log('result: ', json.token);

    token = json.token;

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}
