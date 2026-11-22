import {
  bindLoginSubmit,
  getLoginInput,
  showError,
  clearError,
} from './login-view.js';

import {login} from './login-model.js';

import {createHeader} from '../../../shared/headerController/header-controller.js';

/**
 * Handles the login form submission.
 */
function handleLogin() {
  createHeader();

  bindLoginSubmit(async function (event) {
    event.preventDefault();

    const {username, password} = getLoginInput();

    const success = await login(username, password);

    if (success) {
      clearError();
      location.href =
        '../../../../finishedRestaurantWebsite/RestaurantWebsite/public/userPage.html';
    } else {
      showError('Kirjautuminen epäonnistui');
    }
  });
}

export {handleLogin};
