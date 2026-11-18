const loginForm = document.getElementById('login-form');

/**
 * Listens for the submit event of the login form.
 * Prevents the default form submission and calls the login function with the user's input data.
 * Redirects the user to the user page if the login succeeds.
 * Otherwise, displays error message.
 *
 * @param {SubmitEvent} event - the form submission event object.
 */
loginForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');

  if (await login(username, password)) {
    error.innerText = '';
    location.href = './userPage.html?';
  } else {
    error.innerText = 'Kirjautuminen epäonnistui';
    return;
  }
});

/**
 * Posts the user data to the REST API login and saves the users token to session storage.
 *
 * @param {string} username - the users given username.
 * @param {string} password - the users given password.
 * @returns {Promise<Boolean>} - wether the login was successfull.
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
      console.log('Login failed: ', response.status);
      return false;
    }

    const json = await response.json();

    sessionStorage.setItem('token', json.token);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}
