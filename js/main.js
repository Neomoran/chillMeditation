const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".movingOutline circle");
  const video = document.querySelector(".video");

  //sounds
  const sounds = document.querySelectorAll(".soundPicker button");

  //time display
  const timeDisplay = document.querySelector(".timeDisplay");
  const timeSelect = document.querySelectorAll(".timeSelect button");

  //get the length of the circle outline
  const outlineLength = outline.getTotalLength();

  //duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //select different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //play sounds
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //select sounds
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //fx to stop and play the sounds
  const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "imgs/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "imgs/play.svg";
    }
  };

  //we can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //circle animation
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "imgs/play.svg";
      video.pause();
    }
  };
};

app();
