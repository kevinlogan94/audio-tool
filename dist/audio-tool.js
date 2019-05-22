"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * audio-tool custom web component
 * Create by Kevin Logan
 */
var audioTool =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(audioTool, _HTMLElement);

  function audioTool() {
    _classCallCheck(this, audioTool);

    return _possibleConstructorReturn(this, _getPrototypeOf(audioTool).call(this));
  }

  _createClass(audioTool, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.addStyles();
      this.generateAudioElement();
      this.generateSections();
      this.generatePlayPauseButton();
      this.generateTitle();
      this.generateProgressBar();
      this.generateTimeStamp();
      this.generateRestartButton();
      this.generateSvgs();
      this.setTime();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "addStyles",
    value: function addStyles() {
      if (!this.hasAttribute("styles") || this.getAttribute("styles") !== "false") {
        //http://jonraasch.com/blog/javascript-style-node
        this.styles = document.createElement("style");
        this.styles.type = "text/css";
        var css = "audio-tool{position:relative;display:block;margin:8px;padding:8px;box-shadow:1px 2px 5px rgba(0,0,0,0.31);-webkit-box-shadow:1px 2px 5px rgba(0,0,0,0.31);-moz-box-shadow:1px 2px 5px rgba(0,0,0,0.31);border:solid 1px #cbc9c9;border-radius:8px/7px;display:grid;justify-items:center;align-items:center;grid-template-columns:15% 70% 15%;max-width:500px;width:80%;height:200px}audio-tool *{position:relative;display:block;margin:8px;padding:8px}audio-tool audio{display:none}audio-tool button{background-color:transparent;border-radius:50%;border:1px solid #000;cursor:pointer;width:45px;height:45px;padding:0}audio-tool button:focus,audio-tool button:active{-webkit-box-shadow:inset 0px 0px 10px #c1c1c1;-moz-box-shadow:inset 0px 0px 10px #c1c1c1;box-shadow:inset 0px 0px 10px #c1c1c1;outline:none}audio-tool progress{cursor:pointer;display:block;width:95%;height:50px}audio-tool label{display:block;font-size:1em}audio-tool h1{font-size:1.25em}audio-tool style{display:none}audio-tool svg{margin:auto;padding:0}audio-tool .left-section{order:1;height:auto;width:auto}audio-tool .middle-section{order:2;height:auto;width:90%}audio-tool .right-section{order:3;height:auto;width:auto}@media screen and (min-width: 48em){audio-tool h1{font-size:1.5em}}";

        if (this.styles.styleSheet) {
          this.styles.styleSheet.cssText = css;
        } else {
          this.styles.appendChild(document.createTextNode(css));
        } //Add these styles to the head


        document.getElementsByTagName("head")[0].appendChild(this.styles);
      }
    }
  }, {
    key: "generateSections",
    value: function generateSections() {
      //left
      this.leftSection = document.createElement("div");
      this.leftSection.className = "left-section";
      this.appendChild(this.leftSection); //middle

      this.middleSection = document.createElement("div");
      this.middleSection.className = "middle-section";
      this.appendChild(this.middleSection); //right

      this.rightSection = document.createElement("div");
      this.rightSection.className = "right-section";
      this.appendChild(this.rightSection);
    }
  }, {
    key: "generateAudioElement",
    value: function generateAudioElement() {
      this.audioElement = document.createElement("audio");
      this.appendChild(this.audioElement);
      this.extractAttributesForAudioElement();
      this.checkSong();
    }
  }, {
    key: "extractAttributesForAudioElement",
    value: function extractAttributesForAudioElement() {
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
  }, {
    key: "generateSvgs",
    value: function generateSvgs() {
      // Play Element
      var boxWidth = 35;
      var boxHeight = 35;
      var viewBox = 25;
      this.playSvgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.playSvgElem.setAttributeNS(null, "viewBox", "0 0 " + viewBox + " " + viewBox);
      this.playSvgElem.setAttributeNS(null, "width", boxWidth);
      this.playSvgElem.setAttributeNS(null, "height", boxHeight);
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttributeNS(null, "d", "M8 5v14l11-7z");
      this.playSvgElem.appendChild(path); //Pause Element

      boxWidth = 30;
      boxHeight = 30;
      viewBox = 25;
      this.pauseSvgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.pauseSvgElem.setAttributeNS(null, "viewBox", "0 0 " + viewBox + " " + viewBox);
      this.pauseSvgElem.setAttributeNS(null, "width", boxWidth);
      this.pauseSvgElem.setAttributeNS(null, "height", boxHeight);
      this.pauseSvgElem.style.display = "none";
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttributeNS(null, "d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z");
      this.pauseSvgElem.appendChild(path); //Restart Element

      boxWidth = 30;
      boxHeight = 30;
      viewBox = 17;
      var restartSvgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      restartSvgElem.setAttributeNS(null, "viewBox", "0 0 " + viewBox + " " + viewBox);
      restartSvgElem.setAttributeNS(null, "width", boxWidth);
      restartSvgElem.setAttributeNS(null, "height", boxHeight);
      restartSvgElem.setAttributeNS(null, "class", "restart");
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttributeNS(null, "d", "M9 13.5c-2.49 0-4.5-2.01-4.5-4.5S6.51 4.5 9 4.5c1.24 0 2.36.52 3.17 1.33L10 8h5V3l-1.76 1.76C12.15 3.68 10.66 3 9 3 5.69 3 3.01 5.69 3.01 9S5.69 15 9 15c2.97 0 5.43-2.16 5.9-5h-1.52c-.46 2-2.24 3.5-4.38 3.5z");
      restartSvgElem.appendChild(path);
      this.playPauseButton.appendChild(this.playSvgElem);
      this.playPauseButton.appendChild(this.pauseSvgElem);
      this.restartButton.appendChild(restartSvgElem);
    }
  }, {
    key: "generatePlayPauseButton",
    value: function generatePlayPauseButton() {
      var _this = this;

      this.playPauseButton = document.createElement("button");
      this.playPauseButton.setAttribute("aria-label", "Play Audio");
      this.playing = false;
      this.playPauseButton.addEventListener("click", function () {
        if (!_this.playing) {
          _this.pauseSvgElem.style.display = "block";
          _this.playSvgElem.style.display = "none";

          _this.playPauseButton.setAttribute("aria-label", "Pause Audio");

          _this.audioElement.play();

          _this.playing = true;
        } else {
          _this.pauseSvgElem.style.display = "none";
          _this.playSvgElem.style.display = "block";

          _this.playPauseButton.setAttribute("aria-label", "Play Audio");

          _this.audioElement.pause();

          _this.playing = false;
        }
      });
      this.leftSection.appendChild(this.playPauseButton);
    }
  }, {
    key: "generateRestartButton",
    value: function generateRestartButton() {
      var _this2 = this;

      this.restartButton = document.createElement("button");
      this.restartButton.className = "restart";
      this.restartButton.addEventListener("click", function () {
        _this2.audioElement.currentTime = 0; // update playPauseButton

        if (!_this2.playing) {
          _this2.pauseSvgElem.style.display = "block";
          _this2.playSvgElem.style.display = "none";

          _this2.playPauseButton.setAttribute("aria-label", "Pause Audio");

          _this2.audioElement.play();

          _this2.playing = true;
        }
      });
      this.rightSection.appendChild(this.restartButton);
    }
  }, {
    key: "generateProgressBar",
    value: function generateProgressBar() {
      var _this3 = this;

      this.progressBar = document.createElement("progress");
      this.progressBar.value = 0;
      this.progressBar.max = 1;
      this.progressBar.addEventListener("click", function (event) {
        // Update current time
        var percent = event.offsetX / _this3.progressBar.offsetWidth;
        _this3.audioElement.currentTime = percent * _this3.audioElement.duration;
        _this3.progressBar.value = percent;
      });
      this.middleSection.appendChild(this.progressBar);
    }
  }, {
    key: "generateTimeStamp",
    value: function generateTimeStamp() {
      this.timeElement = document.createElement("label");
      this.middleSection.appendChild(this.timeElement);
    }
  }, {
    key: "generateTitle",
    value: function generateTitle() {
      this.titleElement = document.createElement("h1");

      if (this.hasAttribute("title")) {
        this.titleElement.textContent = this.getAttribute("title");
      } else if (this.hasAttribute("src")) {
        this.titleElement.textContent = this.getAttribute("src");
      }

      this.titleElement.setAttribute("aria-label", "Song Title");
      this.middleSection.appendChild(this.titleElement);
    }
  }, {
    key: "setTime",
    value: function setTime() {
      var _this4 = this;

      if (this.hasAttribute("src")) {
        this.audioElement.onloadedmetadata = function () {
          _this4.timeElement.textContent = _this4.convertToMMSS(_this4.audioElement.currentTime) + " / " + _this4.convertToMMSS(_this4.audioElement.duration);

          _this4.audioElement.ontimeupdate = function () {
            _this4.progressBar.value = _this4.audioElement.currentTime / _this4.audioElement.duration;
            _this4.timeElement.textContent = _this4.convertToMMSS(_this4.audioElement.currentTime) + " / " + _this4.convertToMMSS(_this4.audioElement.duration);

            if (_this4.audioElement.currentTime === _this4.audioElement.duration) {
              _this4.playing = false;
              _this4.audioElement.currentTime = 0;
              _this4.pauseSvgElem.style.display = "none";
              _this4.playSvgElem.style.display = "block";

              _this4.playPauseButton.setAttribute("aria-label", "Play Audio");
            }
          };
        };
      }
    }
  }, {
    key: "checkSong",
    value: function checkSong() {
      if (this.audioElement.src) {
        var songFile = this.audioElement.src;
        var fileType = songFile.substring(songFile.lastIndexOf(".") + 1); //https://diveintohtml5.info/everything.html#audio-vorbis

        switch (fileType) {
          case "mp3":
            if (!!!(this.audioElement.canPlayType && this.audioElement.canPlayType("audio/mpeg;").replace(/no/, ""))) {
              this.titleElement.textContent = "This browser doesn't support MP3 Format audio file";
            }

            break;

          case "m4a":
            if (!!!(this.audioElement.canPlayType && this.audioElement.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ""))) {
              this.titleElement.textContent = "This browser doesn't support AAC Format audio file";
            }

            break;

          case "aac":
            if (!!!(this.audioElement.canPlayType && this.audioElement.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, ""))) {
              this.titleElement.textContent = "This browser doesn't support AAC Format audio file";
            }

            break;

          case "wav":
            if (!!!(this.audioElement.canPlayType && this.audioElement.canPlayType('audio/wav; codecs="1"').replace(/no/, ""))) {
              this.titleElement.textContent = "This browser doesn't support WAV Format audio file";
            }

            break;

          case "ogg":
            if (!!!(this.audioElement.canPlayType && this.audioElement.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""))) {
              this.titleElement.textContent = "This browser doesn't support Vorbis Format audio file";
            }

            break;

          default:
            if (!!!this.audioElement.canPlayType("audio/" + fileType)) {
              this.titleElement.textContent = "This browser doesn't support this audio file";
            }

            break;
        }
      }
    } // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss

  }, {
    key: "convertToMMSS",
    value: function convertToMMSS(time) {
      var sec_num = parseInt(time, 10); // don't forget the second param

      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (!minutes) {
        minutes = "0";
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      var finalValue = "";

      if (hours > 0) {
        finalValue += hours + ":";
      }

      if (minutes) {
        finalValue += minutes + ":";
      }

      finalValue += seconds;
      return finalValue;
    }
  }]);

  return audioTool;
}(_wrapNativeSuper(HTMLElement));

customElements.define("audio-tool", audioTool);