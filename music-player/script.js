const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.querySelector("#artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durationEl = document.querySelector(".duration");
const currentTimeEl = document.getElementById("current-time");
const slider = document.getElementById("slider");

// music
songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jac Des",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jac Des",
  },
  {
    name: "jacinto-3",
    displayName: "Electric Chill Machine 2",
    artist: "Jac Des",
  },
  {
    name: "jacinto-3",
    displayName: "Front Row",
    artist: "Jac Des",
  },
];

// check if playing
let isPlaying = false;

// check if isdragging
let isDragging = false;

// play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// play or pause event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update dom

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
}

// prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
}

// update prog bar and time
function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;

  // update prog bar width
  const progressPercent = (currentTime / duration) * 100;
  if (!isDragging) progress.style.width = `${progressPercent}%`;

  // calc display for duration
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);
  if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
  //delay switching dur el to avoid NaN
  if (durationSeconds) {
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }

  // calc display for current time
  const currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;

  currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

  // update the slider
  if(!isDragging) slider.style.left = `${progress.clientWidth}px`;
}

// set prog bar and slider
function setProgressBar(e) {
  const clickX = e.clientX - progressContainer.offsetLeft
  music.currentTime = (clickX / progressContainer.clientWidth) * music.duration
  slider.style.left = progress.clientWidth
}

// on load - select 1st song
loadSong(songs[songIndex]);

// draggable prog
function dragStart(e) {
  if (e.target === slider) {
    isDragging = true;
    progressContainer.classList.add("show-slider");
  }
}

function dragEnd() {
  if(!isDragging) return 

  music.currentTime = (parseFloat(progress.style.width) / 100) * music.duration
  progressContainer.classList.remove("show-slider");
  isDragging = false;
}

function dragMove(e) {
  if (!isDragging) return;
  const { offsetLeft, clientWidth } = progressContainer;

  if (e.clientX <= offsetLeft) {
    slider.style.left = 0;
    progress.style.width = '0%';
    return

  } else if (e.clientX > offsetLeft + clientWidth) {
    slider.style.left = "100%";
    progress.style.width = "100%";
    return

  }

    slider.style.left = `${e.clientX - offsetLeft}px`
    progress.style.width = `${((e.clientX - offsetLeft) / clientWidth) * 100}%`

}

// event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);

progressContainer.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragMove);
document.addEventListener("mouseup", dragEnd);

progressContainer.addEventListener("mouseenter", function (e) {
  this.classList.add("show-slider");
});

progressContainer.addEventListener("mouseleave", function (e) {
  if (!isDragging) this.classList.remove("show-slider");
});
