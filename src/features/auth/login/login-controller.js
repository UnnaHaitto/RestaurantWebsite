import {
  bindLoginSubmit,
  getLoginInput,
  showError,
  clearError,
} from './login-view';

import {login} from './login-model';

/**
 * Handles the login form submission.
 */
function handleLogin() {
  bindLoginSubmit(async function (event) {
    event.preventDefault();

    const {username, password} = getLoginInput();

    const success = await login(username, password);

    if (success) {
      clearError();
      location.href = '../../../../public/userPage.html';
    } else {
      showError('Kirjautuminen epäonnistui');
    }
  });
}

export {handleLogin};
