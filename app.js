const changeSet = document.querySelector('.setCount');
const changeBreak= document.querySelector('.breakCount');
const sessionTime = document.querySelector('.sessionTime');
const playBtn = document.querySelector('.playBtn');
const reset = document.querySelector('.resetBtn');
const pause = document.querySelector('.pause');
const activity = document.querySelector('.activity');

const sliderUp = document.querySelector('.sliderUp');
const sliderDown = document.querySelector('.sliderDown');

const breakDown = document.querySelector('.breakSlideDown');
const breakUp = document.querySelector('.breakSlideUp');


let countdown;
let isClicked = false;
let paused = false;


// Start/Stop/Reset events

playBtn.addEventListener('click', function(){ 
    let dynamicSession = parseInt(sessionTime.innerText)*60;
    pause.classList.remove('stopped');
    if(!isClicked) {
    activity.innerText = 'Work';
    activity.style.color = 'green';
    startTimer(dynamicSession);
    }
});

reset.addEventListener('click', resetTimer);
pause.addEventListener('click', stopTimer);


// Modify session and break time - buttons

sliderUp.addEventListener('click', function(){
    if(!isClicked){
    changeSet.innerText = parseInt(changeSet.innerText) + 1;
    sessionTime.innerText = changeSet.innerText + ':' + '00';
    }
})

sliderDown.addEventListener('click', function(){
    if(!isClicked){
    if(changeSet.innerText > 1){
    changeSet.innerText = parseInt(changeSet.innerText) - 1;
    sessionTime.innerText = changeSet.innerText + ':' + '00';
        }
    }
})

breakDown.addEventListener('click', function() {
    if(!isClicked){
        if(changeBreak.innerText > 0){
        changeBreak.innerText = parseInt(changeBreak.innerText) - 1;
        }
    }
})

breakUp.addEventListener('click', function() {
    if(!isClicked){
        changeBreak.innerText = parseInt(changeBreak.innerText) + 1;
    }
})

// Start the countdown

function startTimer(seconds){
    isClicked = true;
    playBtn.style.color = 'green';
    const now = Date.now();
    const then = now + seconds * 1000;
    
   countdown = setInterval(() => {
        const secondsLeft = Math.floor((then - Date.now()) / 1000 + 2);
        if(secondsLeft < 0){
            clearInterval(countdown);
            sessionTime.innerText = 'Done!';
            playBtn.style.color = '#000';

            if(!paused){
                paused = true;
                startBreak();
                startTimer(startBreak());
                activity.innerHTML = 'Break';
                activity.style.color = 'red';
                return;
                }

            else {
            startTimer(seconds);
            paused = false;
            return;
            }

            
        }
        if(reset.classList.contains('reset')){
            clearInterval(countdown);
            startTimer(seconds);
            reset.classList.remove('reset');
            return;
        }

        if(pause.classList.contains('stopped')){
            let timeSplit = (sessionTime.innerHTML).split(":");
            clearInterval(countdown);
            playBtn.style.color = '#000';
            activity.style.color = "#000";
            sessionTime.innerHTML = changeSet.innerHTML + ':' + '00';
            isClicked = false;
            return;
            
        }

        sessionTime.innerText = displayTime(secondsLeft);
        displayTime(secondsLeft);
    }, 1000)
}

// Format the time

function displayTime(seconds){
    
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = Math.floor(seconds % 60);
      if(remainderSeconds <= 9) {
        remainderSeconds = '0' + remainderSeconds; 
       }
    let timeDisplay = minutes + ':' + remainderSeconds;
    return timeDisplay;
}

// Reset interval

function resetTimer(){
    reset.classList.add('reset');
}

function stopTimer(){
    activity.innerText = 'Session';
    pause.classList.add('stopped');
}

function startBreak(){
    let breakTime = changeBreak.innerHTML*60;
    return breakTime;
}