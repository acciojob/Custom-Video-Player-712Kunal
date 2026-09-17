const player = document.querySelector('.player'); const video = player.querySelector('.viewer'); const progress = player.querySelector('.progress'); const progressBar = player.querySelector('.progress__filled'); const toggle = player.querySelector('.toggle'); const skipButtons = player.querySelectorAll('[data-skip]'); const ranges = player.querySelectorAll('.player__slider'); 
function togglePlay() { if (video.paused) { video.play(); } else { video.pause(); } updateButton(); } 

function updateButton() { toggle.innerHTML = video.paused ? '►' : '❚ ❚'; }
function handleProgress() { if (!video.duration || isNaN(video.duration)) { return; } const percent = (video.currentTime / video.duration) * 100; progressBar.style.width = `${percent}%`; progressBar.style.flexBasis = `${percent}%`; }
function handleRangeUpdate() { video[this.name] = this.value; } 
function skip() { video.currentTime += parseFloat(this.dataset.skip); } 
function scrub(e) { if (!video.duration) { return; } const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; video.currentTime = scrubTime; } 
toggle.addEventListener('click', togglePlay); 
video.addEventListener('play', updateButton); 
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress); 
skipButtons.forEach(button => { button.addEventListener('click', skip); }); 
ranges.forEach(range => { range.addEventListener( 'change', handleRangeUpdate ); range.addEventListener( 'mousemove', handleRangeUpdate ); }); 
progress.addEventListener('click', scrub); 
video.addEventListener('click', togglePlay); 
video.addEventListener('error', () => { toggle.textContent = '►'; const errorMessage = document.createElement('p'); errorMessage.textContent = 'Unable to load the video. Please check download.mp4.'; errorMessage.style.color = 'white'; errorMessage.style.background = 'red'; errorMessage.style.padding = '10px'; errorMessage.style.textAlign = 'center'; player.appendChild(errorMessage); });