import {isCreationPossible} from '../../shared/usernameCheck/usernameCheck.js';

import {apiUrl} from '../../shared/api/api.js';

/**
 * Fetches the current logged in user's data.
 *
 * @param {String} token - The user's authentication Token.
 * @returns {Promise<Object>} - The fetched user data.
 */
async function fetchUserData(token) {
  const data = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(apiUrl + '/users/token', data);

  if (!response.ok) {
    throw new Error('Unable to fetch user data!');
  }

  const userData = await response.json();

  return userData;
}

/**
 * Uploads a new image to the REST API.
 *
 * @param {file} file - The image file to upload.
 * @param {String} token - The user's authentication token.
 *
 * @returns {Promise<Boolean>} - Whether the image save was successfull.
 */
async function saveImage(file, token) {
  const formData = new FormData();
  formData.append('avatar', file);

  const data = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  };

  try {
    const response = await fetch(apiUrl + '/users/avatar', data);

    if (!response.ok) {
      const error = await response.json();
      console.log('error: ', error);
      return false;
    }

    return true;
  } catch (error) {
    console.log('Failed to upload image: ', error);

    return false;
  }
}

/**
 * Updates the users info to the REST API
 *
 * @param {Object} updateData - The users new information.
 * @param {String} token - The users authentication token.
 *
 * @returns {Promise<Boolean>} - whether the user data updating was successfull.
 */
async function updateUserInfo(updateData, token) {
  if (updateData.username) {
    const isPossible = await isCreationPossible(updateData.username);

    if (!isPossible) {
      return false;
    }
  }

  const data = {
    body: JSON.stringify(updateData),
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(apiUrl + '/users', data);

    if (!response.ok) {
      const error = await response.text();

      console.error('Error updating user info:', response.status, error);

      return false;
    }

    return true;
  } catch (error) {
    console.log('Failed to update user info: ', error);
    return false;
  }
}

export {fetchUserData, saveImage, updateUserInfo};
