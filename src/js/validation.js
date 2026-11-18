/**
 * Validates a password.
 *
 * @param {String} password - the password to validate.
 * @param {Boolean} required - Whether the password is required.
 *
 * @returns {String} An error message or an empty string if the password is valid.
 */
export function validatePassword(password, required = true) {
  if (password.length === 0) {
    return required ? 'Pitää antaa salasana!' : '';
  }

  if (password.length < 5) {
    return ' Salasanan pitää olla ainakin 5 merkkiä pitkä ';
  } else if (!/[a-z]/.test(password)) {
    return ' Salasanan pitää sisältää pieniä kirjaimia ';
  } else if (!/[A-Z]/.test(password)) {
    return ' Salasanan pitää sisältää isoja kirjaimia ';
  } else if (!/[0-9]/.test(password)) {
    return ' Salasanan pitää sisältää numeroita ';
  } else if (!/[^a-zA-Z0-9]/.test(password)) {
    return ' Salasanan pitää sisältää erikoismerkkejä ';
  }

  return '';
}

/**
 * Validates a username.
 *
 * @param {String} username - the username to validate.
 *
 * @returns {String} An error message or an empty string if the username is valid.
 */
export function validateUsername(username) {
  return username.length === 0 ? 'Pitää antaa käyttäjä nimi' : '';
}

/**
 * Validates and email address.
 *
 * @param {String} email - the email to validate.
 * @param {Boolean} required - Whether the email is required.
 *
 * @returns {String} An error message or an empty string if the email is valid.
 */
export function validateEmail(email, required = true) {
  if (email.length === 0) {
    return required ? 'Pitää antaa sähköpostiosoite' : '';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email)
    ? ''
    : 'Pitää antaa kelvollinen sähköpostiosoite';
}
