document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('mainContainer').innerHTML =
    header() + mainPage() + footer();
  likeButtonListener();
});

function likeButtonListener() {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      if (event.target.classList.contains('like-button')) {
        if (button.textContent === '♡') {
          button.textContent = '♥'; // Change to filled heart
        } else {
          button.textContent = '♡'; // Change back to empty heart
        }
      }
    });
  });
}

function menuLinkListener() {
  const dailyMenuLink = document.querySelector('.menu-link-daily');
  const weeklyMenuLink = document.querySelector('.menu-link-weekly');

  dailyMenuLink.addEventListener('click', function () {
    document.getElementById('mainContainer').innerHTML =
      header() + menuPage() + footer();
  });

  weeklyMenuLink.addEventListener('click', function () {
    document.getElementById('mainContainer').innerHTML =
      header() + menuPage() + footer();
  });
}
