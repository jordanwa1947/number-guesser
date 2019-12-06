const bubbleParent = document.querySelector('main');
let randNumb = generateRandomNumber();
let guessCounter = 0;

const guessForm = document.getElementById('guess-form');
const guessFields = document.querySelectorAll('#guess-form input');
const gameplayCont = document.getElementById('gameplay-cont');
const rangeField = document.getElementById('range-field');

const submitGuess = document.getElementById('submit-guess');
const resetGame = document.getElementById('reset-game');
const clearFormButton = document.getElementById('clear-form');

const gameResultsColumn = document.getElementById('game-results-column');

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
  const challengerTwoName = document.getElementById('challenger-two-name-push');
  const challengerTwoGuess = document.getElementById('challenger-two-guess-push');
  const challengerTwoNameInput = document.getElementById('challenger-two-name');
  const challengerTwoGuessInput = document.getElementById('challenger-two-guess');
  guessCounter += 2;
  guessComparison(challengerOneGuessInput.value, challengerTwoGuessInput.value, challengerOneNameInput.value, challengerTwoNameInput.value)
  challengerOneName.innerHTML = `<span>${challengerOneNameInput.value}</span>`;
  challengerOneGuess.innerHTML = `<p class="challenger-guess-number">${challengerOneGuessInput.value}</p>`;
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
  let minRangeValue = Number.parseInt(minRangeInput.value);
  let maxRangeValue = Number.parseInt(maxRangeInput.value);
  minRange.innerHTML = minRangeInput.value;
  maxRange.innerHTML = maxRangeInput.value;
  randNumb = generateRandomNumber(minRangeValue, maxRangeValue);
  event.preventDefault();
  rangeField.reset();
}

function generateRandomNumber(min=0, max=100) {
  return Math.floor(Math.random() * (max - min) + min);
}

function guessComparison (firstUserGuess, secondUserGuess, firstUserName, secondUserName) {
  firstGuess = Number.parseInt(firstUserGuess);
  secondGuess = Number.parseInt(secondUserGuess);
  let firstGuessProximity;
  let secondGuessProximity
  if (firstGuess > randNumb) {
    firstGuessProximity = `that's too high`
  } else if (firstGuess < randNumb) {
    firstGuessProximity = `that's too low`
  } else if (firstGuess === randNumb) {
    firstGuessProximity = 'BOOM!'
    insertResultCard(firstUserName, secondUserName, firstUserName);
  }
  if (secondGuess > randNumb) {
    secondGuessProximity = `that's too high`
  } else if (secondGuess < randNumb) {
    secondGuessProximity = `that's too low`
  } else if (secondGuess === randNumb) {
    secondGuessProximity = 'BOOM!'
    insertResultCard(firstUserName, secondUserName, secondUserName);
  }
  insertGuessProximity(firstGuessProximity, secondGuessProximity);
}

function insertGuessProximity (userOneProximity, userTwoProximity) {
  const firstGuessCont = document.getElementById('user-one-guess-result');
  const secondGuessCont = document.getElementById('user-two-guess-result');
  firstGuessCont.innerText = userOneProximity;
  secondGuessCont.innerText = userTwoProximity;
}

function insertResultCard (firstUserName, secondUserName, winner) {
  gameResultsColumn.insertAdjacentHTML('beforeend', `<section class="results-card">
    <div class="results-top">
      <span class="align-left bold">${firstUserName}</span>
      <span class="align-center">vs</span>
      <span class="align-right bold">${secondUserName}</span>
    </div>
    <hr>
      <div class="results-middle">
        <h2>${winner}</h2>
        <p class="winner">WINNER</h3>
      </div>
    </hr>
    <div class="results-bottom">
      <span class="align-left"><strong>${guessCounter}</strong> GUESSES</span>
      <span class="align-center"><strong>1</strong> MINUTE <strong>35</strong> SECONDS</span>
      <span class="align-right"><span class="close-button-circle">&times;</span></span>
    </div>
  </section>`)
  deleteResultsCardOnClick();
}

function deleteResultsCardOnClick () {
  const resultCards = gameResultsColumn.querySelectorAll('.results-card');
  const lastResultCard = resultCards[resultCards.length - 1]
  const closeX = lastResultCard.querySelector('.close-button-circle');
  closeX.addEventListener('click', function () {
    lastResultCard.remove();
  })
}
