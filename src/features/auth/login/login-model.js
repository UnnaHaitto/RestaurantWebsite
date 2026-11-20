import {apiUrl} from '../../../shared/api/api';

/**
 * Logs in the user through the REST API.
 * Saves the authentication token to the session storage.
 *
 * @param {string} username - Username.
 * @param {string} password - Password.
 * @returns {Promise<Boolean>} - If the login was successfull.
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
    const response = await fetch(apiUrl + '/auth/login', data);

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

export {login};
