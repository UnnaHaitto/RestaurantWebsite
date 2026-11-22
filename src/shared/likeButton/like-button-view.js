function setButtonHeart(button) {
  let text = '';

  if (button.innerText == '♡') {
    text = '♥';
    button.innerText = text;
  } else {
    text = '♡';
    button.innerText = text;
  }

  return text;
}

export {setButtonHeart};
