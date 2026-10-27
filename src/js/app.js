document.addEventListener('DOMContentLoaded', function () {
  loadMainPage();
});

function loadMainPage() {
  document.getElementById('mainContainer').innerHTML =
    header() + mainPage() + footer();
}

function loadDailyMenuPage() {
  document.getElementById('mainContainer').innerHTML =
    header() + menuPageDaily() + footer();
}

function loadWeeklyMenuPage() {
  document.getElementById('mainContainer').innerHTML =
    header() + menuPageWeekly() + footer();
}

document.addEventListener('click', function (event) {
  if (event.target.closest('.nav-link')) {
    loadMainPage();
    return;
  }

  if (event.target.closest('.menu-link-daily')) {
    loadDailyMenuPage();
    return;
  }

  if (event.target.closest('.menu-link-weekly')) {
    loadWeeklyMenuPage();
    return;
  }

  if (event.target.closest('.like-button')) {
    const button = event.target;
    if (button.textContent === '♡') {
      button.textContent = '♥'; // Change to filled heart
    } else {
      button.textContent = '♡'; // Change back to empty heart
    }
  }
});
