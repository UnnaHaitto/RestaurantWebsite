import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../../shared/validation/validation.js';

import {fetchUserData, saveImage, updateUserInfo} from './profile-model.js';

import {
  elements,
  displayUserData,
  displayError,
  displayImageMessage,
  displayValidationError,
  noErrors,
  getUserInput,
  clearError,
  clearUserInput,
} from './profile-view.js';

import {createHeader} from '../../shared/headerController/header-controller.js';

// Get the user's authentication token.
const token = sessionStorage.getItem('token');

/**
 * Fetches user data and displays it on the user page.
 */
async function addDataToPage() {
  try {
    const userData = await fetchUserData(token);

    displayUserData(userData);
  } catch (error) {
    console.log('Failed to fetch user data: ', error);
    displayError('Käyttäjätietojen hakeminen epäonnistui.');
  }
}

/**
 * Validates the username input when the user types.
 */
elements.username.addEventListener('input', () => {
  const error = validateUsername(elements.username.value, false);

  displayValidationError('usernameError', error);
});

/**
 * Validates the password input when the user types.
 */
elements.password.addEventListener('input', () => {
  const error = validatePassword(elements.password.value, false);

  displayValidationError('passwordError', error);
});

/**
 * Validates the email input when the user types.
 */
elements.email.addEventListener('input', () => {
  const error = validateEmail(elements.email.value, false);

  displayValidationError('emailError', error);
});

/**
 * Handles profile image uploads.
 *
 * Checks that the selected image doesn't exceed 5 MB.
 * If the upload succeeds, the profile information is refreshed.
 *
 * @param {Event} event - The image input change event.
 */
async function handleImageUpload(event) {
  event.preventDefault();

  const file = elements.input.files[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    displayImageMessage('Kuva on liian iso');
    return;
  }

  const saved = await saveImage(file, token);

  if (saved) {
    displayImageMessage('Kuva tallennettu!');
    await addDataToPage();
  } else {
    displayImageMessage('Kuvaa ei tallennettu!');
  }
}

/**
 * Handles updating the user's profile information.
 *
 * Only updates fields that contain new information.
 *
 * @param {Event} event - The button click event.
 */
async function handleUserUpdate(event) {
  event.preventDefault();

  clearError();

  if (!noErrors()) {
    displayError('Selvitä ensin kaikki ongelmat!');
    return;
  }

  const userInput = getUserInput();

  const updateData = {};

  if (userInput.username !== '') {
    updateData.username = userInput.username;
  }

  if (userInput.password !== '') {
    updateData.password = userInput.password;
  }

  if (userInput.email !== '') {
    updateData.email = userInput.email;
  }

  const updated = await updateUserInfo(updateData, token);

  if (updated) {
    clearUserInput();
    await addDataToPage();
  } else {
    displayError('Käyttäjä tietojen päivittäminen epäonnistui!');
  }
}

/**
 * Logs out the user and redirects them to main page.
 */
function logout() {
  sessionStorage.clear();
  window.location.href = '../../../public/main.html';
}

function profileController() {
  createHeader();

  if (!token) {
    window.location.href = '../../../public/main.html';
    return;
  }

  addDataToPage();

  elements.input.addEventListener('change', handleImageUpload);

  elements.changeButton.addEventListener('click', handleUserUpdate);

  elements.logoutButton.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
}

export {profileController};
