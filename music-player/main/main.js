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
const songImage = document.querySelector(".song-info img");
const songTitle = document.querySelector(".song-info h4");
const songArtist = document.querySelector(".song-info p");

let currentSongIndex = 0;
let playlist = [];

// Fetch songs from Deezer API
async function fetchSongs(query = "motivational") {
  try {
    // Using a CORS proxy to avoid CORS issues
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${query}&limit=10`
    );
    const data = await response.json();

    playlist = data.data.map((song) => ({
      title: song.title,
      artist: song.artist.name,
      audioPreview: song.preview, // 30-second preview URL
      imgPath: song.album.cover_medium,
      duration: song.duration,
    }));

    // Load first song
    loadSong(playlist[0]);
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

// Load song function
function loadSong(song) {
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  audio.src = song.audioPreview;
  songImage.src = song.imgPath;

  // Reset progress and time
  progressBar.style.width = "0%";
  progressPoint.style.left = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";

  // Add fade effect
  songImage.classList.add("fade");
  setTimeout(() => songImage.classList.remove("fade"), 500);

  // Update playing status
  updateNowPlayingBars(false);

  // Wait for metadata to load to get duration
  audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
  });
}

// Previous song
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = playlist.length - 1;
  }
  loadSong(playlist[currentSongIndex]);
  if (!audio.paused) {
    audio.play();
    updateNowPlayingBars(true);
  }
}

// Next song
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > playlist.length - 1) {
    currentSongIndex = 0;
  }
  loadSong(playlist[currentSongIndex]);
  if (!audio.paused) {
    audio.play();
    updateNowPlayingBars(true);
  }
}

// Update playing animation
function updateNowPlayingBars(isPlaying) {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.animationPlayState = isPlaying ? "running" : "paused";
  });
}

// Play/Pause functionality
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio
      .play()
      .then(() => {
        playBtn.textContent = "⏸";
        updateNowPlayingBars(true);
      })
      .catch((error) => console.error("Playback failed:", error));
  } else {
    audio.pause();
    playBtn.textContent = "▶";
    updateNowPlayingBars(false);
  }
});

// Add search functionality
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search for songs...";
searchInput.classList.add("search-input");

const searchButton = document.createElement("button");
searchButton.textContent = "🔍";
searchButton.classList.add("search-button");

const searchContainer = document.createElement("div");
searchContainer.classList.add("search-container");
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);

document.querySelector(".music-player").prepend(searchContainer);

searchButton.addEventListener("click", () => {
  if (searchInput.value.trim()) {
    fetchSongs(searchInput.value.trim());
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value.trim()) {
    fetchSongs(searchInput.value.trim());
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// Initialize with motivational songs
fetchSongs("motivational");

// Format time in minutes and seconds
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Update progress bar and time
function updateProgress() {
  const { duration, currentTime } = audio;
  if (isNaN(duration)) return;

  // Update progress bar
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressPoint.style.left = `${progressPercent}%`;

  // Update time displays
  currentTimeEl.textContent = formatTime(currentTime);
  totalTimeEl.textContent = formatTime(duration);
}

// Set progress when clicking on progress bar
function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Handle drag functionality for progress point
let isDragging = false;

progressPoint.addEventListener("mousedown", (e) => {
  isDragging = true;
  e.stopPropagation(); // Prevent click event on container
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = progressContainer.getBoundingClientRect();
  const containerWidth = progressContainer.clientWidth;
  let x = e.clientX - rect.left;

  // Keep within bounds
  x = Math.max(0, Math.min(x, containerWidth));

  const percent = x / containerWidth;

  // Update visuals
  progressBar.style.width = `${percent * 100}%`;
  progressPoint.style.left = `${percent * 100}%`;

  // Update audio time
  audio.currentTime = percent * audio.duration;
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

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

// Add these event listeners
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// Adding error handling for audio
audio.addEventListener("error", (e) => {
  console.error("Audio error:", e);
  alert("Error loading audio. Please try another song.");
});
