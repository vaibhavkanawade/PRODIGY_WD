let startTime;
let running = false;
let laps = [];
let lapCounter = 1;

function startStop() {
    if (running) {
        clearInterval(interval);
        running = false;
    } else {
        startTime = Date.now() - (laps.reduce((acc, lap) => acc + lap, 0) || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function reset() {
    clearInterval(interval);
    running = false;
    document.getElementById('display').textContent = '00:00:00';
    laps = [];
    lapCounter = 1;
    document.getElementById('lapTimes').innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = Date.now() - startTime - laps.reduce((acc, lap) => acc + lap, 0);
        laps.push(lapTime);
        const formattedTime = formatTime(lapTime);
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${lapCounter++}: ${formattedTime}`;
        document.getElementById('lapTimes').appendChild(lapItem);
    }
}