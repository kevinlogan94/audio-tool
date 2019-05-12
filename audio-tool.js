/**
 * audio-tool custom web component
 * Create by Kevin Logan
 */

class audoTool extends HTMLElement {
  audioElement;
  playButton;
  audioButton;
  timeElement;
  restartButton;
  progressBar;
  titleElement;

  constructor() {
    super();
  }
  connectedCallback() {
    console.log("connected");
    this.generateAudioElement();
    this.generateTitle();
    this.generatePlayButton();
    this.generatePauseButton();
    this.generateRestartButton();
    this.generateProgressBar();
    this.generateTimeStamp();
    this.setTime();
    // this.height = "200";
    // this.width = "100";
  }
  disconnectedCallback() {
    console.log("disconnected");
  }

  generatePlayButton() {
    this.playButton = document.createElement("button");
    this.playButton.textContent = "play";
    this.playButton.setAttribute("aria-label", "Play Button");
    this.playButton.addEventListener("click", () => {
      this.audioElement.play();
    });
    this.appendChild(this.playButton);

    if (this.hasAttribute("auto-play")) {
      if (this.getAttribute("auto-play") === "true") {
        this.audioElement.autoplay = true;
        this.audioElement.load();
      }
    }
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
    this.appendChild(this.audioElement);

    //define a song to be played
    if (this.hasAttribute("src")) {
      this.audioElement.src = this.getAttribute("src");
    }
    if (this.hasAttribute("preload")) {
      this.audioElement.preload = this.getAttribute("preload");
    }
  }

  generatePauseButton() {
    this.audioButton = document.createElement("button");
    this.audioButton.textContent = "pause";
    this.audioButton.setAttribute("aria-label", "pause button");
    this.audioButton.addEventListener("click", () => {
      this.audioElement.pause();
    });
    this.appendChild(this.audioButton);
  }

  generateRestartButton() {
    this.restartButton = document.createElement("button");
    this.restartButton.textContent = "restart";
    this.restartButton.addEventListener("click", () => {
      this.audioElement.currentTime = 0;
      this.audioElement.play();
    });
    this.appendChild(this.restartButton);
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
    this.appendChild(this.progressBar);
  }

  generateTimeStamp() {
    this.timeElement = document.createElement("label");
    this.appendChild(this.timeElement);
  }

  generateTitle() {
    this.titleElement = document.createElement("h1");
    if (this.hasAttribute("title")) {
      this.titleElement.textContent = this.getAttribute("title");
    } else if (this.hasAttribute("src")) {
      this.titleElement.textContent = this.getAttribute("src");
    }
    this.titleElement.setAttribute("aria-label", "Song Title");
    this.appendChild(this.titleElement);
  }

  setTime() {
    if (this.hasAttribute("src")) {
      this.audioElement.onloadedmetadata = () => {
        this.timeElement.textContent = this.convertToMMSS(this.audioElement.currentTime) + " / " + this.convertToMMSS(this.audioElement.duration);
        this.audioElement.ontimeupdate = () => {
          this.progressBar.value = this.audioElement.currentTime / this.audioElement.duration;
          this.timeElement.textContent = this.convertToMMSS(this.audioElement.currentTime) + " / " + this.convertToMMSS(this.audioElement.duration);
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
