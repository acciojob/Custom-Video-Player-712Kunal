const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play / Pause button
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Update progress bar
function handleProgress() {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.width = `${percent}%`;
  progressBar.style.flexBasis = `${percent}%`;
}

// Volume and playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip forward / backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Click on progress bar to seek
function scrub(e) {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

// Play / Pause button
toggle.addEventListener("click", togglePlay);

// Update button whenever video starts/stops
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// Update progress while playing
video.addEventListener("timeupdate", handleProgress);

// Skip buttons
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

// Volume and playback speed controls
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("input", handleRangeUpdate);
});

// Progress bar seeking
progress.addEventListener("click", scrub);

// Clicking the video toggles play/pause
video.addEventListener("click", togglePlay);

// Video loading error
video.addEventListener("error", () => {
  toggle.textContent = "►";

  // Prevent multiple error messages
  if (player.querySelector(".video-error")) {
    return;
  }

  const errorMessage = document.createElement("p");

  errorMessage.className = "video-error";
  errorMessage.textContent =
    "Unable to load the video. Please check download.mp4.";

  errorMessage.style.color = "white";
  errorMessage.style.background = "red";
  errorMessage.style.padding = "10px";
  errorMessage.style.textAlign = "center";
  errorMessage.style.margin = "0";

  player.appendChild(errorMessage);
});