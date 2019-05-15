/**
 * audio-tool custom web component
 * Create by Kevin Logan
 */

class audoTool extends HTMLElement {
  //  These bug out browsers so I'm commenting them out.
  //   audioElement;
  //   playButton;
  //   audioButton;
  //   timeElement;
  //   restartButton;
  //   progressBar;
  //   titleElement;
  //   playing;

  constructor() {
    super();
  }
  connectedCallback() {
    console.log("connected");
    this.generateAudioElement();
    this.extractAttributesForAudioElement();
    this.generateSections();
    this.generatePlayPauseButton();
    this.generateTitle();
    this.generateProgressBar();
    this.generateTimeStamp();
    this.generateRestartButton();
    this.generateCoverArt();
    this.setTime();
    this.addRightSectionAnimation();
  }
  disconnectedCallback() {
    console.log("disconnected");
  }

  generateSections() {
    //left
    this.leftSection = document.createElement("div");
    this.leftSection.id = "leftSection";
    this.leftSection.className = "section";
    this.appendChild(this.leftSection);
    //middle
    this.middleSection = document.createElement("div");
    this.middleSection.id = "middleSection";
    this.appendChild(this.middleSection);
    //right
    this.rightSection = document.createElement("div");
    this.rightSection.id = "rightSection";
    this.appendChild(this.rightSection);
  }

  addRightSectionAnimation() {
    this.rightSection.onmouseenter = () => {
      this.coverArtElement.className = "hide";
      this.restartButton.className = "restart";
    };
    //The right section's width and height alter depending on what is displayed.
    //so adding a workaround
    this.middleSection.onmouseenter = () => {
      this.coverArtElement.className = "";
      this.restartButton.className = "hide";
    };
    this.onmouseleave = () => {
      this.coverArtElement.className = "";
      this.restartButton.className = "hide";
    };
    this.leftSection.onmouseenter = () => {
      this.coverArtElement.className = "";
      this.restartButton.className = "hide";
    };
  }

  generateAudioElement() {
    this.audioElement = document.createElement("audio");
    // this.audioElement.textContent = "Your browser does not support the audio element.";

    //Create source elements
    // let mpegSrc = document.createElement("source");
    // mpegSrc.setAttribute("type", "audio/mpeg");
    // let oggSrc = document.createElement("source");
    // oggSrc.setAttribute("type", "audio/ogg");
    // let wavSrc = document.createElement("source");
    // wavSrc.setAttribute("type", "audio/wav");

    //Add source to audio element and then add audio element to <audio-tool>.
    // this.audioElement.appendChild(mpegSrc);
    // this.audioElement.appendChild(oggSrc);
    // this.audioElement.appendChild(wavSrc);
    this.audioElement.setAttribute("preload", "metadata");
    this.appendChild(this.audioElement);
  }

  extractAttributesForAudioElement() {
    //define a song to be played
    if (this.hasAttribute("src")) {
      this.audioElement.src = this.getAttribute("src");
    }
    if (this.hasAttribute("preload")) {
      this.audioElement.preload = this.getAttribute("preload");
    }
    if (this.hasAttribute("auto-play")) {
      if (this.getAttribute("auto-play") === "true") {
        this.audioElement.autoplay = true;
        this.audioElement.load();
      }
    }
  }

  generatePlayPauseButton() {
    this.playPauseButton = document.createElement("button");
    this.playPauseButton.className += "play";
    this.playPauseButton.setAttribute("aria-label", "Play Button");
    this.playing = false;
    this.playPauseButton.addEventListener("click", () => {
      if (!this.playing) {
        this.playPauseButton.className = this.playPauseButton.className.replace("play", "pause");
        this.playPauseButton.setAttribute("aria-label", "Pause Button");
        this.audioElement.play();
        this.playing = true;
      } else {
        this.playPauseButton.className = this.playPauseButton.className.replace("pause", "play");
        this.playPauseButton.setAttribute("aria-label", "Play Button");
        this.audioElement.pause();
        this.playing = false;
      }
    });
    this.leftSection.appendChild(this.playPauseButton);
  }

  generateRestartButton() {
    this.restartButton = document.createElement("button");
    // this.restartButton.textContent = "restart";
    this.restartButton.className = "hide";
    this.restartButton.addEventListener("click", () => {
      this.audioElement.currentTime = 0;
      // update playPauseButton
      if (this.playing) {
        this.playPauseButton.className = this.playPauseButton.className.replace("play", "pause");
        this.playPauseButton.setAttribute("aria-label", "Pause Button");
        this.audioElement.play();
        this.playing = true;
      }
    });
    this.rightSection.appendChild(this.restartButton);
  }

  generateProgressBar() {
    this.progressBar = document.createElement("progress");
    this.progressBar.value = 0;
    this.progressBar.max = 1;
    this.progressBar.addEventListener("click", event => {
      // Update current time
      let percent = event.offsetX / this.progressBar.offsetWidth;
      this.audioElement.currentTime = percent * this.audioElement.duration;
      this.progressBar.value = percent;
    });
    this.middleSection.appendChild(this.progressBar);
  }

  generateTimeStamp() {
    this.timeElement = document.createElement("label");
    this.middleSection.appendChild(this.timeElement);
  }

  generateTitle() {
    this.titleElement = document.createElement("h1");
    if (this.hasAttribute("title")) {
      this.titleElement.textContent = this.getAttribute("title");
    } else if (this.hasAttribute("src")) {
      this.titleElement.textContent = this.getAttribute("src");
    }
    this.titleElement.setAttribute("aria-label", "Song Title");
    this.middleSection.appendChild(this.titleElement);
  }

  generateCoverArt() {
    this.coverArtElement = document.createElement("img");
    if (this.hasAttribute("img")) {
      this.coverArtElement.src = this.getAttribute("img");
    } else {
      this.coverArtElement.src = "../content/music-note.jpg";
    }
    this.rightSection.appendChild(this.coverArtElement);
  }

  setTime() {
    if (this.hasAttribute("src")) {
      this.audioElement.onloadedmetadata = () => {
        this.timeElement.textContent = this.convertToMMSS(this.audioElement.currentTime) + " / " + this.convertToMMSS(this.audioElement.duration);
        this.audioElement.ontimeupdate = () => {
          this.progressBar.value = this.audioElement.currentTime / this.audioElement.duration;
          this.timeElement.textContent = this.convertToMMSS(this.audioElement.currentTime) + " / " + this.convertToMMSS(this.audioElement.duration);
          if (this.audioElement.currentTime === this.audioElement.duration) {
            this.playing = false;
            this.audioElement.currentTime = 0;
            this.playPauseButton.className = this.playPauseButton.className.replace("pause", "play");
            this.playPauseButton.setAttribute("aria-label", "Play Button");
          }
        };
      };
    }
  }

  // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
  convertToMMSS(time) {
    let sec_num = parseInt(time, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (!minutes) {
      minutes = "0";
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let finalValue = "";
    if (hours > 0) {
      finalValue += hours + ":";
    }
    if (minutes) {
      finalValue += minutes + ":";
    }
    finalValue += seconds;

    return finalValue;
  }
}

customElements.define("audio-tool", audoTool);
