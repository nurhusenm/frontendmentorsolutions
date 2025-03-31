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
const playlistItems = document.querySelector(".playlist-items");
const favoriteBtn = document.querySelector(".favorite-btn");
const playlistBtn = document.querySelector(".playlist-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
const repeatBtn = document.querySelector(".repeat-btn");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

let currentSongIndex = 0;
let playlist = [];
let isShuffleOn = false;
let isRepeatOn = false;
let isPlaying = false;
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

// Fetch songs from Deezer API
async function fetchSongs(query = "motivational") {
  try {
    const response = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(
        `https://api.deezer.com/search?q=${query}&limit=10`
      )}`
    );
    const data = await response.json();

    playlist = data.data.map((song) => ({
      title: song.title,
      artist: song.artist.name,
      audioPreview: song.preview,
      imgPath: song.album.cover_medium,
      duration: song.duration,
    }));

    currentSongIndex = 0;
    loadSong(playlist[currentSongIndex]);
    updatePlaylist();
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

  progressBar.style.width = "0%";
  progressPoint.style.left = "0%";
  currentTimeEl.textContent = "0:00";
  totalTimeEl.textContent = "0:00";

  songImage.classList.add("fade");
  setTimeout(() => songImage.classList.remove("fade"), 500);

  audio.addEventListener(
    "loadedmetadata",
    () => {
      totalTimeEl.textContent = formatTime(audio.duration);
    },
    { once: true }
  );

  if (isPlaying) {
    audio.play().catch((error) => console.error("Playback failed:", error));
    playBtn.textContent = "⏸";
    updateNowPlayingBars(true);
  } else {
    playBtn.textContent = "▶";
    updateNowPlayingBars(false);
  }
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  updatePlaylist();
}

// Next song
function nextSong() {
  if (isShuffleOn) {
    currentSongIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
  }
  loadSong(playlist[currentSongIndex]);
  updatePlaylist();
}

// Update now playing animation
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
        isPlaying = true;
        playBtn.textContent = "⏸";
        updateNowPlayingBars(true);
      })
      .catch((error) => console.error("Playback failed:", error));
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶";
    updateNowPlayingBars(false);
  }
});

// Search functionality
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

// Event listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", () => {
  if (isRepeatOn) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextSong();
  }
});
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Update progress bar
function updateProgress() {
  const { duration, currentTime } = audio;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  progressPoint.style.left = `${progressPercent}%`;

  currentTimeEl.textContent = formatTime(currentTime);
  totalTimeEl.textContent = formatTime(duration);
}

// Set progress on click
function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Playlist functionality
function updatePlaylist() {
  playlistItems.innerHTML = "";
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = `playlist-item ${
      index === currentSongIndex ? "active" : ""
    }`;
    li.innerHTML = `
      <img src="${song.imgPath}" alt="${song.title}">
      <div class="playlist-item-info">
        <h4>${song.title}</h4>
        <p>${song.artist}</p>
      </div>
    `;
    li.addEventListener("click", () => {
      currentSongIndex = index;
      loadSong(playlist[currentSongIndex]);
      isPlaying = true;
      audio.play();
    });
    playlistItems.appendChild(li);
  });
}

playlistBtn.addEventListener("click", () => {
  document.querySelector(".playlist-container").classList.toggle("show");
});

// Initialize
fetchSongs("motivational");
