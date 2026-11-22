import {setButtonHeart} from './like-button-view.js';

import {saveRestaurantToLiked} from './like-button-model.js';

const token = sessionStorage.getItem('token');

function clearAllLikeButtons() {
  const likeButtons = document.querySelectorAll('.like-button');

  likeButtons.forEach((button) => {
    button.innerText = '♡';
  });
}

function initializeLikeButtons() {
  const container = document.querySelector('.restaurant-container');

  container.addEventListener('click', (event) => {
    const button = event.target.closest('.like-button');

    if (!button) return;

    const restaurantId = button.dataset.value;

    clearAllLikeButtons();

    setButtonHeart(button);

    saveRestaurantToLiked(restaurantId, token);
  });
}

export {initializeLikeButtons};
