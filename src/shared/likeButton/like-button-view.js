/**
 * Fills the heart of the selected restaurant element.
 *
 * @param {HTMLElement} button - The clicked button
 */
function setButtonHeart(button) {
  if (button.innerText == '♡') {
    button.innerText = '♥';
  } else {
    button.innerText = '♡';
  }
}

export {setButtonHeart};
