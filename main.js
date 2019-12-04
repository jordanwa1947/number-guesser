const bubbleParent = document.querySelector('main');

bubbleParent.addEventListener('input', mainFormValidation)

function mainFormValidation() {
  const form = document.querySelector('.main-game-form');
  const submitGuess = document.getElementById('submit-guess')
  if (form.checkValidity() === true) {
    submitGuess.removeAttribute('disabled');
    submitGuess.classList.remove('disabled');
  } else if (form.checkValidity() === false) {
    submitGuess.classList.add('disabled');
    submitGuess.setAttribute('disabled', "");
  }
}
