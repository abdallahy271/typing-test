const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var origin = document.querySelector("#origin-text p");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var texts = ["It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife",
 "Call me Ishmael", 
"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness",
 
 "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed",
 "It was the epoch of belief, it was the epoch of incredulity, it was the season of Light",
 "In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since",
 "He was an old man who fished alone in a skiff in the Gulf Stream and he had gone eighty-four days now without taking a fish",
 
 "It was the season of Darkness, it was the spring of hope, it was the winter of despair",
 "Squire Trelawney, Dr Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17-, and go back to the time when my father kept the Admiral Benbow inn, and the brown old seaman, with the sabre cut, first took up his lodging under our roof",
 "It was love at first sight",
 " In a hole in the ground there lived a hobbit"]
var i = 0;
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = origin.innerHTML.substring(0,textEntered.length);

    if (textEntered == origin.innerHTML) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }

}

// Start the timer:
function start() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    
    origin.innerHTML = texts[i];
    if (i == 10)
        i = -1;    
    i++;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
