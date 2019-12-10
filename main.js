const bubbleParent = document.querySelector('main');
let randNumb = generateRandomNumber();
let guessCounter = 0;
var timeStart = Date.now();
var timeStop = null;

const guessForm = document.getElementById('guess-form');
const guessFields = document.querySelectorAll('#guess-form input');
const gameplayCont = document.getElementById('gameplay-cont');
const rangeField = document.getElementById('range-field');

const submitGuess = document.getElementById('submit-guess');
const resetGame = document.getElementById('reset-game');
const clearFormButton = document.getElementById('clear-form');

const gameResultsColumn = document.getElementById('game-results-column');

const challengerOneName = document.getElementById('challenger-one-name-display');
const challengerOneGuess = document.getElementById('challenger-one-guess-display');
const challengerOneNameInput = document.getElementById('challenger-one-name');
const challengerOneGuessInput = document.getElementById('challenger-one-guess');
const challengerTwoName = document.getElementById('challenger-two-name-display');
const challengerTwoGuess = document.getElementById('challenger-two-guess-display');
const challengerTwoNameInput = document.getElementById('challenger-two-name');
const challengerTwoGuessInput = document.getElementById('challenger-two-guess');

bubbleParent.addEventListener('input', mainFormValidation);
guessForm.addEventListener('keyup', activateClearFormButton);
clearFormButton.addEventListener('click', clearGuessFields);
gameplayCont.addEventListener('submit', displayFormData);
rangeField.addEventListener('submit', setRange);
rangeField.addEventListener('input', toggleDisable);

function stopTimer() {
  timeStop = Date.now();
}

function resetTimer() {
  timeStart = Date.now();
  timeStop = null;
}

function calcGameTime(stop, start) {
  var seconds = Math.floor((stop - start) / 1000);
  var minutes = Math.floor(seconds / 60);
  timeStop = null;
  return `<strong>${minutes}</strong> MINUTES <strong>${seconds}</strong> SECONDS`;
}

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

function clearGuessFields() {
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

function incrementGuessCounter() {
  guessCounter += 2;
}

function displayFormData() {
  const withinRange = guessWithinRange(challengerOneGuessInput, challengerTwoGuessInput);
  incrementGuessCounter();
  if (withinRange.firstGuess && withinRange.secondGuess) {
    guessComparison(challengerOneGuessInput.value, challengerTwoGuessInput.value, challengerOneNameInput.value, challengerTwoNameInput.value);
    challengerOneName.innerHTML = `<span>${challengerOneNameInput.value}</span>`;
    challengerOneGuess.innerHTML = `<p class="challenger-guess-number">${challengerOneGuessInput.value}</p>`;
    challengerTwoName.innerHTML = `<span>${challengerTwoNameInput.value}</span>`;
    challengerTwoGuess.innerHTML = `<p class="challenger-guess-number">${challengerTwoGuessInput.value}</p>`;
    removeGuessErrorMsgs();
    clearGuessFields();
    event.preventDefault();
  } else {
    insertGuessErrorMsg(withinRange);
    event.preventDefault();
  }
}

function removeGuessErrorMsgs () {
  const firstErrorCont = document.getElementById('first-range-error-cont');
  const secondErrorCont = document.getElementById('second-range-error-cont');
  const firstGuessField = document.getElementById('challenger-one-guess');
  const secondGuessField = document.getElementById('challenger-two-guess');
  removeErrorMsgs(firstGuessField, firstErrorCont);
  removeErrorMsgs(secondGuessField, secondErrorCont);
}

function insertGuessErrorMsg (withinRange) {
  const firstErrorCont = document.getElementById('first-range-error-cont');
  const secondErrorCont = document.getElementById('second-range-error-cont');
  const firstGuessField = document.getElementById('challenger-one-guess');
  const secondGuessField = document.getElementById('challenger-two-guess');
  const errMsg = "Out of Range";
  if (!withinRange.firstGuess && !withinRange.secondGuess) {
    insertErrorMessage (firstGuessField, firstErrorCont, errMsg);
    insertErrorMessage (secondGuessField, secondErrorCont, errMsg);
  } else if (!withinRange.firstGuess) {
    insertErrorMessage (firstGuessField, firstErrorCont, errMsg);
    removeErrorMsgs(secondGuessField, secondErrorCont);
  } else if (!withinRange.secondGuess) {
    insertErrorMessage (secondGuessField, secondErrorCont, errMsg);
    removeErrorMsgs(firstGuessField, firstErrorCont);
  }
}

function guessWithinRange (firstField, secondField) {
  const minRange = document.getElementById("min-range-num").innerText;
  const maxRange = document.getElementById("max-range-num").innerText;
  let minValue = Number.parseInt(minRange);
  let maxValue = Number.parseInt(maxRange);
  let firstGuess = Number.parseInt(firstField.value);
  let secondGuess = Number.parseInt(secondField.value);
  return {
    firstGuess: firstGuess >= minRange && firstGuess <= maxRange,
    secondGuess: secondGuess >= minRange && secondGuess <= maxRange
  }
}

function updateRange () {
  const minRange = document.getElementById("min-range-num");
  const maxRange = document.getElementById("max-range-num");
  const newMin = Number.parseInt(minRange.innerText) - 10;
  const newMax = Number.parseInt(maxRange.innerText) + 10;
  minRange.innerText = newMin;
  maxRange.innerText = newMax;
  randNumb = generateRandomNumber(newMin, newMax);
}

function toggleDisable() {
  const minRangeValue = document.getElementById("min-range-input").value;
  const maxRangeValue = document.getElementById("max-range-input").value;
  const updateRangeButton = document.getElementById('update-range-button');
  const min = Number.parseInt(minRangeValue);
  const max = Number.parseInt(maxRangeValue);
  if (min < max && min || min == 0 && max || max == 0) {
    updateRangeButton.classList.remove('disabled');
  } else {
    updateRangeButton.classList.add('disabled');
  }
}

function setRange() {
  const minRangeInput = document.getElementById("min-range-input");
  const maxRangeInput = document.getElementById("max-range-input");
  const maxErrorCont = document.getElementById('max-error-cont');
  let minRangeValue = Number.parseInt(minRangeInput.value);
  let maxRangeValue = Number.parseInt(maxRangeInput.value);
  if (minRangeValue < maxRangeValue) {
    setRangeHTML(maxRangeInput, minRangeInput);
    randNumb = generateRandomNumber(minRangeValue, maxRangeValue);
    removeErrorMsgs(maxRangeInput, maxErrorCont);
    rangeField.reset();
    const updateRangeButton = document.getElementById('update-range-button');
    updateRangeButton.classList.add('disabled');
    event.preventDefault();
  } else {
    insertErrorMessage(maxRangeInput, maxErrorCont, 'Must be greater than min');
  }
};

function setRangeHTML(maxRangeInput, minRangeInput) {
  const minRange = document.getElementById("min-range-num");
  const maxRange = document.getElementById("max-range-num");
  minRange.innerHTML = minRangeInput.value;
  maxRange.innerHTML = maxRangeInput.value;
}

function removeErrorMsgs(input, errorCont) {
  input.classList.remove('pink-border');
  errorCont.innerHTML = '';
}

function insertErrorMessage (input, errorCont, message) {
  input.classList.add('pink-border');
  errorCont.innerHTML = `
  <img class="error-icon" src="./assets/error-icon.svg"> </img>
  <p class="pink error-message">${message}</p>`
  event.preventDefault();
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
    stopTimer();
    firstGuessProximity = 'BOOM!'
    insertResultCard(firstUserName, secondUserName, firstUserName);
    updateRange();
    resetTimer();
    guessCounter = 0;
  }
  if (secondGuess > randNumb) {
    secondGuessProximity = `that's too high`
  } else if (secondGuess < randNumb) {
    secondGuessProximity = `that's too low`
  } else if (secondGuess === randNumb) {
    stopTimer();
    secondGuessProximity = 'BOOM!'
    insertResultCard(firstUserName, secondUserName, secondUserName);
    randNumb = generateRandomNumber();
    updateRange();
    resetTimer();
    guessCounter = 0;
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
  gameResultsColumn.insertAdjacentHTML('afterbegin', `<section class="results-card">
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
      <span class="align-center">${calcGameTime(timeStop, timeStart)}</span>
      <span class="align-right"><span class="close-button-circle">&times;</span></span>
    </div>
  </section>`)
}

gameResultsColumn.addEventListener('click', deleteResultsCardOnClick)

function deleteResultsCardOnClick () {
  if(event.target.className === 'close-button-circle') {
    event.target.parentElement.parentElement.parentElement.remove();
  }
}
