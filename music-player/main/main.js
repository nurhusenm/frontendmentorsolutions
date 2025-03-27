const audio = document.querySelector("audio");
const playBtn = document.querySelector(".playBtn");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const progressPoint = document.querySelector(".progress-point");

// Update progress bar and point
function updateProgress(e) {
  if (isNaN(e.srcElement.duration)) return;

  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressPoint.style.left = `${progressPercent}%`;
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

// Event listeners
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
});

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
