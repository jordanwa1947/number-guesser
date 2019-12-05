const bubbleParent = document.querySelector('main');
let randNumb = generateRandomNumber();

const guessForm = document.getElementById('guess-form');
const guessFields = document.querySelectorAll('#guess-form input');
const gameplayCont = document.getElementById('gameplay-cont');
const rangeField = document.getElementById('range-field');

const submitGuess = document.getElementById('submit-guess');
const resetGame = document.getElementById('reset-game');
const clearFormButton = document.getElementById('clear-form');

bubbleParent.addEventListener('input', mainFormValidation);
guessForm.addEventListener('keyup', activateClearFormButton);
clearFormButton.addEventListener('click', clearGuessFields);

function mainFormValidation() {
  const form = document.getElementById('guess-form');
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
  guessForm.reset();
  disableGuessButtons();
  event.preventDefault();
}

function disableGuessButtons () {
  clearFormButton.classList.add('disabled');
  clearFormButton.setAttribute('disabled', "");
  submitGuess.classList.add('disabled');
  submitGuess.setAttribute('disabled', "");
  resetGame.classList.add('disabled');
  resetGame.setAttribute('disabled', "");
}

gameplayCont.addEventListener('submit', pushFormData);

function pushFormData() {
  const challengerOneName = document.getElementById('challenger-one-name-push');
  const challengerOneGuess = document.getElementById('challenger-one-guess-push');
  const challengerOneNameInput = document.getElementById('challenger-one-name');
  const challengerOneGuessInput = document.getElementById('challenger-one-guess');
  challengerOneName.innerHTML = `<span>${challengerOneNameInput.value}</span>`;
  challengerOneGuess.innerHTML = `<p class="challenger-guess-number">${challengerOneGuessInput.value}</p>`;
  const challengerTwoName = document.getElementById('challenger-two-name-push');
  const challengerTwoGuess = document.getElementById('challenger-two-guess-push');
  const challengerTwoNameInput = document.getElementById('challenger-two-name');
  const challengerTwoGuessInput = document.getElementById('challenger-two-guess');
  challengerTwoName.innerHTML = `<span>${challengerTwoNameInput.value}</span>`;
  challengerTwoGuess.innerHTML = `<p class="challenger-guess-number">${challengerTwoGuessInput.value}</p>`;
  clearGuessFields();
  event.preventDefault();
}

rangeField.addEventListener('submit', setRange)

function setRange() {
  const minRangeInput = document.getElementById("min-range-input");
  const maxRangeInput = document.getElementById("max-range-input");
  const minRange = document.getElementById("min-range-num");
  const maxRange = document.getElementById("max-range-num");
  minRange.innerHTML = minRangeInput.value;
  maxRange.innerHTML = maxRangeInput.value;
  event.preventDefault();
  rangeField.reset();
}

function generateRandomNumber(min=0, max=100) {
  return Math.floor(Math.random() * (max - min) + min);
}
