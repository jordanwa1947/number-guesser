var bubbleParent = document.querySelector('main');
var randNumb = generateRandomNumber();
var guessCounter = 0;
var timeStart = Date.now();
var timeStop = null;

var guessForm = document.getElementById('guess-form');
var guessFields = document.querySelectorAll('#guess-form input');
var gameplayCont = document.getElementById('gameplay-cont');
var rangeField = document.getElementById('range-field');

var submitGuess = document.getElementById('submit-guess');
var resetGame = document.getElementById('reset-game');
var clearFormButton = document.getElementById('clear-form');

var gameResultsColumn = document.getElementById('game-results-column');

var challengerOneName = document.getElementById('challenger-one-name-display');
var challengerOneGuess = document.getElementById('challenger-one-guess-display');
var challengerOneNameInput = document.getElementById('challenger-one-name');
var challengerOneGuessInput = document.getElementById('challenger-one-guess');
var challengerTwoName = document.getElementById('challenger-two-name-display');
var challengerTwoGuess = document.getElementById('challenger-two-guess-display');
var challengerTwoNameInput = document.getElementById('challenger-two-name');
var challengerTwoGuessInput = document.getElementById('challenger-two-guess');

var minRangeInput = document.getElementById("min-range-input");
var maxRangeInput = document.getElementById("max-range-input");
var maxErrorCont = document.getElementById('max-error-cont');

bubbleParent.addEventListener('input', mainFormValidation);
guessForm.addEventListener('keyup', activateClearFormButton);
clearFormButton.addEventListener('click', clearGuessFields);
gameplayCont.addEventListener('submit', displayFormData);
rangeField.addEventListener('submit', setRange);
rangeField.addEventListener('input', toggleDisable);
resetGame.addEventListener('click', resetEntireGame);

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
  var form = document.getElementById('guess-form');
  if (form.checkValidity() === true) {
    submitGuess.removeAttribute('disabled');
    submitGuess.classList.remove('disabled');
  } else if (form.checkValidity() === false) {
    submitGuess.classList.add('disabled');
    submitGuess.setAttribute('disabled', "");
  }
}

function activateClearFormButton () {
  for (var i = 0; i < guessFields.length; i++) {
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

function enableResetButton() {
  resetGame.removeAttribute('disabled');
  resetGame.classList.remove('disabled');

}

function incrementGuessCounter() {
  guessCounter += 2;
}

function displayFormData() {
  var withinRange = guessWithinRange(challengerOneGuessInput, challengerTwoGuessInput);
  incrementGuessCounter();
  if (withinRange.firstGuess && withinRange.secondGuess) {
    guessComparison(challengerOneGuessInput.value, challengerTwoGuessInput.value, challengerOneNameInput.value, challengerTwoNameInput.value);
    displayGuessHtml();
    removeGuessErrorMsgs();
    clearGuessFields();
    enableResetButton();
    event.preventDefault();
  } else {
    insertGuessErrorMsg(withinRange);
    event.preventDefault();
  }
}

function resetEntireGame() {
  removeGuessErrorMsgs();
  clearGuessFields();
  clearResultCards();
  resetRangeForm()
  resetRange();
  guessCounter = 0;
  resetTimer();
  event.preventDefault();
}

function resetRange() {
  var minRange = document.getElementById("min-range-num");
  var maxRange = document.getElementById("max-range-num");
  randNumb = generateRandomNumber();
  minRange.innerText = '1';
  maxRange.innerText = '100';
}

function clearResultCards() {
  gameResultsColumn.innerHTML = '';
}

function displayGuessHtml() {
  challengerOneName.innerHTML = `<span>${challengerOneNameInput.value}</span>`;
  challengerOneGuess.innerHTML = `<p class="challenger-guess-number">${challengerOneGuessInput.value}</p>`;
  challengerTwoName.innerHTML = `<span>${challengerTwoNameInput.value}</span>`;
  challengerTwoGuess.innerHTML = `<p class="challenger-guess-number">${challengerTwoGuessInput.value}</p>`;
}

function removeGuessErrorMsgs () {
  var firstErrorCont = document.getElementById('first-range-error-cont');
  var secondErrorCont = document.getElementById('second-range-error-cont');
  var firstGuessField = document.getElementById('challenger-one-guess');
  var secondGuessField = document.getElementById('challenger-two-guess');
  removeErrorMsgs(firstGuessField, firstErrorCont);
  removeErrorMsgs(secondGuessField, secondErrorCont);
}

function insertGuessErrorMsg (withinRange) {
  var firstErrorCont = document.getElementById('first-range-error-cont');
  var secondErrorCont = document.getElementById('second-range-error-cont');
  var firstGuessField = document.getElementById('challenger-one-guess');
  var secondGuessField = document.getElementById('challenger-two-guess');
  var errMsg = "Out of Range";
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
  var minRange = document.getElementById("min-range-num").innerText;
  var maxRange = document.getElementById("max-range-num").innerText;
  var minValue = Number.parseInt(minRange);
  var maxValue = Number.parseInt(maxRange);
  var firstGuess = Number.parseInt(firstField.value);
  var secondGuess = Number.parseInt(secondField.value);
  return {
    firstGuess: firstGuess >= minRange && firstGuess <= maxRange,
    secondGuess: secondGuess >= minRange && secondGuess <= maxRange
  }
}

function updateRange () {
  var minRange = document.getElementById("min-range-num");
  var maxRange = document.getElementById("max-range-num");
  var newMin = Number.parseInt(minRange.innerText) - 10;
  var newMax = Number.parseInt(maxRange.innerText) + 10;
  minRange.innerText = newMin;
  maxRange.innerText = newMax;
  randNumb = generateRandomNumber(newMin, newMax);
}

function toggleDisable() {
  var updateRangeButton = document.getElementById('update-range-button');
  var min = Number.parseInt(minRangeInput.value);
  var max = Number.parseInt(maxRangeInput.value);
  if (min < max && min || min == 0 && max || max == 0) {
    updateRangeButton.classList.remove('disabled');
  } else {
    updateRangeButton.classList.add('disabled');
  }
}

function setRange() {
  var minRangeValue = Number.parseInt(minRangeInput.value);
  var maxRangeValue = Number.parseInt(maxRangeInput.value);
  if (minRangeValue < maxRangeValue) {
    var updateRangeButton = document.getElementById('update-range-button');
    updateRangeButton.classList.add('disabled');
    resetRangeForm();
    event.preventDefault();
  } else {
    insertErrorMessage(maxRangeInput, maxErrorCont, 'Must be greater than min');
  }
};

function resetRangeForm() {
  setRangeHTML();
  console.log(minRangeInput.value, maxRangeInput.value)
  randNumb = generateRandomNumber(minRangeInput.value, maxRangeInput.value);
  removeErrorMsgs(maxRangeInput, maxErrorCont);
  rangeField.reset();
}

function setRangeHTML() {
  var minRange = document.getElementById("min-range-num");
  var maxRange = document.getElementById("max-range-num");
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
  var firstProximity = guessOneComparison(firstGuess);
  var secondProximity = guessTwoComparison(secondGuess);
  insertGuessProximity(firstProximity, secondProximity);
}

function guessOneComparison(guessOne) {
  var firstGuessProximity;
  if (guessOne > randNumb) {
    firstGuessProximity = `that's too high`
  } else if (guessOne < randNumb) {
    firstGuessProximity = `that's too low`
  } else if (guessOne === randNumb) {
    stopTimer();
    firstGuessProximity = 'BOOM!'
    insertResultCard(challengerOneNameInput.value, challengerTwoNameInput.value, challengerOneNameInput.value);
    updateRange();
    resetTimer();
    guessCounter = 0;
  }
  return firstGuessProximity;
}

function guessTwoComparison(guessTwo) {
  var secondGuessProximity;
  if (guessTwo > randNumb) {
    secondGuessProximity = `that's too high`
  } else if (guessTwo < randNumb) {
    secondGuessProximity = `that's too low`
  } else if (guessTwo === randNumb) {
    stopTimer();
    secondGuessProximity = 'BOOM!'
    insertResultCard(challengerOneNameInput.value, challengerTwoNameInput.value, challengerTwoNameInput.value);
    randNumb = generateRandomNumber();
    updateRange();
    resetTimer();
    guessCounter = 0;
  }
  return secondGuessProximity;
}

function insertGuessProximity (userOneProximity, userTwoProximity) {
  var firstGuessCont = document.getElementById('user-one-guess-result');
  var secondGuessCont = document.getElementById('user-two-guess-result');
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
