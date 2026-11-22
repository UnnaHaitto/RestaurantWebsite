function setButtonHeart(button) {
  if (button.innerText == '♡') {
    button.innerText = '♥';
  } else {
    button.innerText = '♡';
  }
}

function attachLikeButtonListeners(likeButtons, handler) {
  likeButtons.forEach(function (button) {
    button.addEventListener('click', handler);
  });
}

function createLikeButton() {
  return '<p class="like-button">♡</p>';
}

export {setButtonHeart, attachLikeButtonListeners, createLikeButton};
