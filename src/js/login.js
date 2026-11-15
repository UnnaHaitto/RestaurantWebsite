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
