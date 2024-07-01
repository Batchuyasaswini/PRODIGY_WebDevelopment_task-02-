let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = '00:00:00';
    difference = 0;
    running = false;
    lapsList.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        lapCounter++;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((updatedTime % 1000) / 10);
    
    display.innerHTML = 
        (hours > 9 ? hours : "0" + hours) + ":" + 
        (minutes > 9 ? minutes : "0" + minutes) + ":" + 
        (seconds > 9 ? seconds : "0" + seconds) + "." + 
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
