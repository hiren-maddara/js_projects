const music = document.querySelector('audio')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.querySelector('#artist')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const durationEl = document.querySelector('.duration')
const currentTimeEl = document.getElementById('current-time')

// music
songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jac Des'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jac Des'
    },
    {
        name: 'jacinto-3',
        displayName: 'Electric Chill Machine 2',
        artist: 'Jac Des'
    },
    {
        name: 'jacinto-3',
        displayName: 'Front Row',
        artist: 'Jac Des'
    },
]


// check if playing
let isPlaying  = false

// play
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
    music.play()
}

// Pause
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'play')
    music.pause()
}

// play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// update dom

function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// current song
let songIndex = 0

// next song
function nextSong(){
    songIndex++
    if (songIndex > songs.length - 1) songIndex = 0
    loadSong(songs[songIndex])
    playSong()
}

// prev song
function prevSong(){
    songIndex--
    if(songIndex < 0) songIndex = songs.length - 1
    loadSong(songs[songIndex])
    playSong()
}

// update prog bar and time
function  updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement

        // update prog bar width
        const progressPercent = (currentTime / duration)*100
        progress.style.width = `${progressPercent}%`

        // calc display for duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`
        //delay switching dur el to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        
        // calc display for current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`
        
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
        
    }
}

// set prog bar
function setProgressBar(e){
    const width  = this.clientWidth
    const clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX / width) * duration
}

// on load - select 1st song
loadSong(songs[songIndex])


// event listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
music.addEventListener('ended', nextSong)