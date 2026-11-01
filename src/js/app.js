const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    if (button.innerText == '♡') {
      button.innerText = '♥';
    } else {
      button.innerText = '♡';
    }
  });
});
