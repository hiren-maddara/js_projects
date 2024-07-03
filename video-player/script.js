const video = document.querySelector(".video");
const player = document.querySelector('.player')
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTimeEl = document.querySelector(".time-elapsed");
const durationEl = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.getElementById('player-speed')

player.tabIndex = 0

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// calcuate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60); //rounds down
  let seconds = Math.floor(time % 60); //what's left after you take away full minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

// update prog bar as video plays
function updateProgress() {
  const { currentTime, duration } = video;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  currentTimeEl.textContent = `${displayTime(video.currentTime)} / `;
  durationEl.textContent = `${displayTime(video.duration)}`;
}

// click to seek
function setProgress(e) {
  const newTime = e.offsetX / progressRange.clientWidth;
  video.currentTime = newTime * video.duration;
  progressBar.style.width = `${newTime * 100}%`;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

// vol bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;

  // round vol up or down
  if (volume < 0.1) volume = 0;
  if (volume > 0.9) volume = 1;

  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // change icon depending on volume
  volumeIcon.className = "";
  volume > 0.7 && volumeIcon.classList.add("fas", "fa-volume-up");
  volume < 0.7 &&
    volume > 0 &&
    volumeIcon.classList.add("fas", "fa-volume-down");
  volume === 0 && volumeIcon.classList.add("fas", "fa-volume-off");

  lastVolume = volume;
}

// mute/unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
    video.volume > 0.7 && volumeIcon.classList.add("fas", "fa-volume-up");
    video.volume < 0.7 &&
      video.volume > 0 &&
      volumeIcon.classList.add("fas", "fa-volume-down");
    video.volume === 0 && volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(el) {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { /* Safari */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { /* IE11 */
      el.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen')
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen')
}

  let fullscreen = false

  function toggleFullScreen(){
    if(!fullscreen){
        openFullscreen(player)
    } else {
        closeFullscreen()
    }
    fullscreen = !fullscreen
  }

// key press
function onKeyPress(e){
    if (e.key === 'f') toggleFullScreen()
    if (e.key === ' ') togglePlay()
    if (e.key === 'm') toggleMute()

}


// event listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("ended", showPlayIcon);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener('change', changeSpeed)
fullscreenBtn.addEventListener('click', toggleFullScreen)

player.addEventListener('keydown', onKeyPress)
player.addEventListener('dblclick', toggleFullScreen)