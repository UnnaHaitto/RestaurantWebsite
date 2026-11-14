document.getElementById('login-button').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === '1234') {
    window.location.href = '../pages/userPage.html';
  } else {
    alert('Virheellinen käyttäjätunnus tai salasana.');
  }
});

async function createUser() {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
    );

    if (!response.ok) {
      throw new Error('Unable to fetch restaurants!');
    }

    restaurants = await response.json();

    return restaurants;
  } catch (error) {
    restaurantPromise = null;
    console.log(error.message);
  }
}
