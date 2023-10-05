let timerId;
let lastTimerStartTime = 0;
let millisElapsedBeforeLastStart = 0;

const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  startButton.disabled = true;
  resetButton.disabled = true;
  stopButton.disabled = false;

  lastTimerStartTime = Date.now();
  timerId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  stopButton.disabled = true;
  startButton.disabled = false;
  resetButton.disabled = false;

  millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime;

  cancelAnimationFrame(timerId);
}

function resetTimer() {
  resetButton.disabled = true;
  timer.textContent = "00:00:000";

  millisElapsedBeforeLastStart = 0;
}

function updateTimer() {
  const millisecondsElapsed =
    Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart;
  const secondsElapsed = millisecondsElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  const millisText = formatNumber(millisecondsElapsed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondsElapsed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2);

  timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
  timerId = requestAnimationFrame(updateTimer);
}

function formatNumber(number, length) {
  const stringNumber = String(number);
  return stringNumber.padStart(length, "0");
}
