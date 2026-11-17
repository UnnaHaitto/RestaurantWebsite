const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', async function (event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');

  if (await login(username, password)) {
    error.innerText = '';
    location.href = './userPage.html?';
  } else {
    error.innerText = 'Kirjautuminen epäonnistui';
  }
});

/**
 * Posts the user data to the REST API login and saves the users token to session storage.
 *
 * @param {string} username - the users given username.
 * @param {string} password - the users given password.
 * @returns {Promise<Object>} - the logged in users data.
 */
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
      throw new Error('Unable to login user!');
    }

    const json = await response.json();

    sessionStorage.setItem('token', json.token);

    console.log('result: ', sessionStorage.getItem('token'));
    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}
