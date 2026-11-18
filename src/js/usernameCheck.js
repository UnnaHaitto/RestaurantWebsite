/**
 * Checks whether the username is available.
 *
 * @param {string} username - the users input username.
 *
 * @returns {Promise<Boolean>} - wether the username is available.
 */
export async function isCreationPossible(username) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/' +
        username
    );

    if (!response.ok) {
      throw new Error('User availability check failed!');
    }

    const json = await response.json();

    return json.available;
  } catch (error) {
    console.log(error.message);
  }
}
