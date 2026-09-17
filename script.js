
const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');

const skipButtons = player.querySelectorAll('[data-skip]');

const ranges = player.querySelectorAll('.player__slider');


// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Change button symbol
function updateButton() {
  if (video.paused) {
    toggle.textContent = '►';
  } else {
    toggle.textContent = '❚ ❚';
  }
}


// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}


// Change volume and playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}


// Skip / rewind video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// Click on progress bar to seek
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}


// Play / pause button
toggle.addEventListener('click', togglePlay);


// Update button when video plays
video.addEventListener('play', updateButton);


// Update button when video pauses
video.addEventListener('pause', updateButton);


// Update progress bar while video is playing
video.addEventListener('timeupdate', handleProgress);


// Skip buttons
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});


// Volume and playback speed
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
});


// Click progress bar
progress.addEventListener('click', scrub);


// Click video itself to play/pause
video.addEventListener('click', togglePlay);


// Handle video loading error
video.addEventListener('error', () => {
  const errorMessage = document.createElement('p');

  errorMessage.textContent = 'Unable to load the video. Please check download.mp4.';

  errorMessage.style.color = 'white';
  errorMessage.style.background = 'red';
  errorMessage.style.padding = '10px';
  errorMessage.style.textAlign = 'center';

  player.appendChild(errorMessage);
});

