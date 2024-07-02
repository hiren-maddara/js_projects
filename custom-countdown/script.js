const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdown-form");
const dateEl = document.getElementById("date-picker");
const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");
const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');



// set date input min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//global values
let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let countdownActive;
let savedCountdown

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownValue - now;
      const days = Math.floor(distance / day);
      const hours = Math.floor((distance % day) / hour);
      const minutes = Math.floor((distance % hour) / minute);
      const seconds = Math.floor((distance % minute) / second);
      // Hide Input
      inputContainer.hidden = true;
      // If the countdown has ended, show final state
      if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
      } else {
        // else, show the countdown in progress
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
      }
    }, second);
  }

// take values from form input
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }

  localStorage.setItem('countdown', JSON.stringify(savedCountdown))
  
  //   check valid date
  if(countdownDate === ''){
      alert('please enter a valid date')
    } else{
    // get the num version of curretn date
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();

}
}

// reset all vals
function reset(){
    // hide countdowns, show input
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false

    // stop countdwown
    clearInterval(countdownActive)

    // reset values
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')

}

// restoe prev countdown
function restorePreviousCountdown(){
  // get countdown from localstr if exits
  if(localStorage.getItem('countdown')){
    savedCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = savedCountdown.title
    countdownDate = savedCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDOM()
  }
}

// event listeners
countdownForm.addEventListener("submit", updateCountdown);
completeBtn.addEventListener('click', reset)
countdownBtn.addEventListener('click', reset)

//on load, check local str
restorePreviousCountdown()