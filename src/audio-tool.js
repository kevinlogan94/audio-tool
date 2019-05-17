/**
 * audio-tool custom web component
 * Create by Kevin Logan
 */

class audioTool extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addStyles();
    this.generateAudioElement();
    this.extractAttributesForAudioElement();
    this.generateSections();
    this.generatePlayPauseButton();
    this.generateTitle();
    this.generateProgressBar();
    this.generateTimeStamp();
    this.generateRestartButton();
    this.setTime();
  }
  disconnectedCallback() {}

  addStyles() {
    if (!this.hasAttribute("styles") || this.getAttribute("styles") !== "false") {
      //http://jonraasch.com/blog/javascript-style-node
      this.styles = document.createElement("style");
      this.styles.type = "text/css";

      let css =
        "audio-tool{position:relative;display:block;margin:8px;padding:8px;box-shadow:1px 2px 5px rgba(0,0,0,0.31);-webkit-box-shadow:1px 2px 5px rgba(0,0,0,0.31);-moz-box-shadow:1px 2px 5px rgba(0,0,0,0.31);border:solid 1px #cbc9c9;border-radius:8px/7px;display:grid;justify-items:center;align-items:center;grid-template-columns:15% 70% 15%;max-width:500px;width:80%;height:175px}audio-tool *{position:relative;display:block;margin:8px;padding:8px}audio-tool button{border-radius:50%;border:1px solid #000;cursor:pointer;width:45px;height:45px}audio-tool button:focus,audio-tool button:active{-webkit-box-shadow:inset 0px 0px 10px #c1c1c1;-moz-box-shadow:inset 0px 0px 10px #c1c1c1;box-shadow:inset 0px 0px 10px #c1c1c1;outline:none}audio-tool progress{cursor:pointer;display:block;width:auto;height:50px}audio-tool label{display:block;font-size:1em}audio-tool h1{font-size:1.5em}audio-tool style{display:none}audio-tool .play{background:url(../icons/play.png);background-repeat:no-repeat;background-position:center center}audio-tool .pause{background:url(../icons/pause.png);background-repeat:no-repeat;background-position:center center}audio-tool .restart{background:url(../icons/restart.png);background-repeat:no-repeat;background-position:center center}audio-tool .left-section{order:1;height:auto;width:auto}audio-tool .middle-section{order:2;height:auto;width:90%}audio-tool .right-section{order:3;height:auto;width:auto}";

      if (this.styles.styleSheet) this.styles.styleSheet.cssText = css;
      else this.styles.appendChild(document.createTextNode(css));

      //Add these styles to the head
      document.getElementsByTagName("head")[0].appendChild(this.styles);
    }
  }

  generateSections() {
    //left
    this.leftSection = document.createElement("div");
    this.leftSection.className = "left-section";
    this.appendChild(this.leftSection);
    //middle
    this.middleSection = document.createElement("div");
    this.middleSection.className = "middle-section";
    this.appendChild(this.middleSection);
    //right
    this.rightSection = document.createElement("div");
    this.rightSection.className = "right-section";
    this.appendChild(this.rightSection);
  }

  generateAudioElement() {
    this.audioElement = document.createElement("audio");
    // this.audioElement.textContent = "Your browser does not support the audio element.";
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
    this.restartButton.className = "restart";
    this.restartButton.addEventListener("click", () => {
      this.audioElement.currentTime = 0;
      // update playPauseButton
      if (!this.playing) {
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

customElements.define("audio-tool", audioTool);
