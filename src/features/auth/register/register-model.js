import {apiUrl} from '../../../shared/api/api.js';

/**
 * Posts the user data to the REST API users.
 *
 * @param {string} username - the users given username.
 * @param {string} password - the users given password.
 * @param {string} email - the users given email.
 *
 * @returns {Promise<Boolean>} - whether the login was successfull.
 */
async function createUser(username, password, email) {
  const data = {
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl + '/users', data);

    if (!response.ok) {
      const error = await response.json();
      console.log('Registration failed:', error);
      return false;
    }

    const userData = await response.json();

    console.log('result: ', userData);

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
}

export {createUser};
