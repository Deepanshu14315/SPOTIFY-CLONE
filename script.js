const tracks = [
    'assets/song1.mp3',
    'assets/song2.mp3',
    'assets/song1.mp3'
    // Add more tracks as needed
];

// Initialize track index
let currentTrackIndex = 0;

// Get references to the audio element and control elements
const audio = new Audio(tracks[currentTrackIndex]);
const playPauseButton = document.getElementById('playPauseButton');
const skipButton = document.getElementById('skipButton');
const volumeControl = document.getElementById('volumeControl');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');

// Initialize audio
audio.volume = volumeControl.value / 100;
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

// Play/Pause functionality
let isPlaying = false;
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.classList.remove('fa-circle-pause');
        playPauseButton.classList.add('fa-circle-play');
    } else {
        audio.play();
        playPauseButton.classList.remove('fa-circle-play');
        playPauseButton.classList.add('fa-circle-pause');
    }
    isPlaying = !isPlaying;
});

// Skip functionality
skipButton.addEventListener('click', () => {
    // Increment current track index
    currentTrackIndex++;
    // Check if index exceeds the number of tracks, then loop back to the first track
    if (currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }
    // Load and play the next track
    audio.src = tracks[currentTrackIndex];
    audio.play();
    // Update play/pause button icon
    playPauseButton.classList.remove('fa-circle-play');
    playPauseButton.classList.add('fa-circle-pause');
    isPlaying = true;
});

// Volume control functionality
volumeControl.addEventListener('input', () => {
    const volume = volumeControl.value / 100; // Convert range value to volume
    audio.volume = volume;
});

// Progress bar and time display update
audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    progressBar.value = audio.currentTime;
});

// Seek functionality
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Utility function to format time in MM:SS format
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}