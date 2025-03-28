const audio = document.querySelector("audio");
const playBtn = document.querySelector(".playBtn");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const progressPoint = document.querySelector(".progress-point");
const currentTimeEl = document.querySelector(".current-time");
const totalTimeEl = document.querySelector(".total-time");
const volumeSlider = document.querySelector(".volume-slider");

// Format time in minutes and seconds
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Update progress bar and time
function updateProgress(e) {
  if (isNaN(e.srcElement.duration)) return;

  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressPoint.style.left = `${progressPercent}%`;

  // Update time displays
  currentTimeEl.textContent = formatTime(currentTime);
  totalTimeEl.textContent = formatTime(duration);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Handle drag functionality
let isDragging = false;

progressPoint.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = progressContainer.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let percent = Math.min(Math.max(x / rect.width, 0), 1);

    progressBar.style.width = `${percent * 100}%`;
    progressPoint.style.left = `${percent * 100}%`;
    audio.currentTime = percent * audio.duration;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Play/Pause functionality
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// Volume control
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Load metadata
audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (audio.paused) {
      audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  }
});
