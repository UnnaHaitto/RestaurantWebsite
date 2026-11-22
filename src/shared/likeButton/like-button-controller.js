import {attachLikeButtonListeners, setButtonHeart} from './like-button-view';

function createLikeButtons() {
  const likeButtons = document.querySelectorAll('.like-button');

  const initializeButtonHeart = () => {
    setButtonHeart(likeButtons);
  };

  attachLikeButtonListeners(likeButtons, initializeButtonHeart);
}

export {createLikeButtons};
