const bubbleParent = document.querySelector('main');

const guessForm = document.getElementById('guess-form');
const guessFields = document.querySelectorAll('#guess-form input');
const clearFormButton = document.getElementById('clear-form');

bubbleParent.addEventListener('input', mainFormValidation);
guessForm.addEventListener('keyup', activateClearFormButton);
clearFormButton.addEventListener('click', clearGuessFields);

function mainFormValidation() {
  const form = document.getElementById('guess-form');
  const submitGuess = document.getElementById('submit-guess')
  if (form.checkValidity() === true) {
    submitGuess.removeAttribute('disabled');
    submitGuess.classList.remove('disabled');
  } else if (form.checkValidity() === false) {
    submitGuess.classList.add('disabled');
    submitGuess.setAttribute('disabled', "");
  }
}

function activateClearFormButton () {
  for (let i = 0; i < guessFields.length; i++) {
    if (guessFields[i].value !== '') {
      clearFormButton.removeAttribute('disabled');
      clearFormButton.classList.remove('disabled');
      break;
    } else {
      clearFormButton.classList.add('disabled');
      clearFormButton.setAttribute('disabled', "");
    }
  }
}

function clearGuessFields () {
  for (let i = 0; i < guessFields.length; i++) {
    guessFields[i].value = '';
  }
  clearFormButton.classList.add('disabled');
  clearFormButton.setAttribute('disabled', "");
}
