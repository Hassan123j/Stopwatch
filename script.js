let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let minutes, seconds, milliseconds;

const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");

function startStop() {
    if (!running) {
        running = true;
        startStopBtn.textContent = "Stop";
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
    } else {
        running = false;
        startStopBtn.textContent = "Start";
        clearInterval(tInterval);
    }
}

function reset() {
    running = false;
    startStopBtn.textContent = "Start";
    clearInterval(tInterval);
    difference = 0;
    updateDisplay(0, 0, 0);
    lapList.innerHTML = "";
}

function updateDisplay(minutes, seconds, milliseconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
    millisecondsDisplay.textContent = String(milliseconds).padStart(2, "0");
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let milliseconds = Math.floor((difference % 1000) / 10);
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);

    updateDisplay(minutes, seconds, milliseconds);
}

function lap() {
    if (!running) return;

    const lapTime = `${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
