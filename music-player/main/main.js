const audio = document.querySelector("audio");

const playBtn = document.querySelector(".playBtn");

playBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("start playing");
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "puase";
  } else {
    audio.pause();
    playBtn.textContent = "play";
    console.log("error");
  }
});
