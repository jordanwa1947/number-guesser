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

bubbleParent.addEventListener('submit', pushFormData);

function pushFormData() {
  const form = document.querySelector('.main-game-form');
  const challengerOneName = document.getElementById('challenger-one-name-push');
  const challengerOneGuess = document.getElementById('challenger-one-guess-push');
  const challengerOneNameInput = document.getElementById('challenger-one-name');
  const challengerOneGuessInput = document.getElementById('challenger-one-guess');
  challengerOneName.innerHTML = challengerOneNameInput.value;
  challengerOneGuess.innerHTML = challengerOneGuessInput.value;
  const challengerTwoName = document.getElementById('challenger-two-name-push');
  const challengerTwoGuess = document.getElementById('challenger-two-guess-push');
  const challengerTwoNameInput = document.getElementById('challenger-two-name');
  const challengerTwoGuessInput = document.getElementById('challenger-two-guess');
  challengerTwoName.innerHTML = challengerTwoNameInput.value;
  challengerTwoGuess.innerHTML = challengerTwoGuessInput.value;
  form.reset();
  event.preventDefault();
}
