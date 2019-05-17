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
var audoTool =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(audoTool, _HTMLElement);

  //  These bug out browsers so I'm commenting them out.
  //   audioElement;
  //   playButton;
  //   audioButton;
  //   timeElement;
  //   restartButton;
  //   progressBar;
  //   titleElement;
  //   playing;
  function audoTool() {
    _classCallCheck(this, audoTool);

    return _possibleConstructorReturn(this, _getPrototypeOf(audoTool).call(this));
  }

  _createClass(audoTool, [{
    key: "connectedCallback",
    value: function connectedCallback() {
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
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      console.log("disconnected");
    }
  }, {
    key: "generateSections",
    value: function generateSections() {
      //left
      this.leftSection = document.createElement("div");
      this.leftSection.id = "leftSection";
      this.leftSection.className = "section";
      this.appendChild(this.leftSection); //middle

      this.middleSection = document.createElement("div");
      this.middleSection.id = "middleSection";
      this.appendChild(this.middleSection); //right

      this.rightSection = document.createElement("div");
      this.rightSection.id = "rightSection";
      this.appendChild(this.rightSection);
    }
  }, {
    key: "addRightSectionAnimation",
    value: function addRightSectionAnimation() {
      var _this = this;

      this.rightSection.onmouseenter = function () {
        _this.coverArtElement.className = "hide";
        _this.restartButton.className = "restart";
      }; //The right section's width and height alter depending on what is displayed.
      //so adding a workaround


      this.middleSection.onmouseenter = function () {
        _this.coverArtElement.className = "";
        _this.restartButton.className = "hide";
      };

      this.onmouseleave = function () {
        _this.coverArtElement.className = "";
        _this.restartButton.className = "hide";
      };

      this.leftSection.onmouseenter = function () {
        _this.coverArtElement.className = "";
        _this.restartButton.className = "hide";
      };
    }
  }, {
    key: "generateAudioElement",
    value: function generateAudioElement() {
      this.audioElement = document.createElement("audio"); // this.audioElement.textContent = "Your browser does not support the audio element.";
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
    key: "generatePlayPauseButton",
    value: function generatePlayPauseButton() {
      var _this2 = this;

      this.playPauseButton = document.createElement("button");
      this.playPauseButton.className += "play";
      this.playPauseButton.setAttribute("aria-label", "Play Button");
      this.playing = false;
      this.playPauseButton.addEventListener("click", function () {
        if (!_this2.playing) {
          _this2.playPauseButton.className = _this2.playPauseButton.className.replace("play", "pause");

          _this2.playPauseButton.setAttribute("aria-label", "Pause Button");

          _this2.audioElement.play();

          _this2.playing = true;
        } else {
          _this2.playPauseButton.className = _this2.playPauseButton.className.replace("pause", "play");

          _this2.playPauseButton.setAttribute("aria-label", "Play Button");

          _this2.audioElement.pause();

          _this2.playing = false;
        }
      });
      this.leftSection.appendChild(this.playPauseButton);
    }
  }, {
    key: "generateRestartButton",
    value: function generateRestartButton() {
      var _this3 = this;

      this.restartButton = document.createElement("button"); // this.restartButton.textContent = "restart";

      this.restartButton.className = "hide";
      this.restartButton.addEventListener("click", function () {
        _this3.audioElement.currentTime = 0; // update playPauseButton

        if (_this3.playing) {
          _this3.playPauseButton.className = _this3.playPauseButton.className.replace("play", "pause");

          _this3.playPauseButton.setAttribute("aria-label", "Pause Button");

          _this3.audioElement.play();

          _this3.playing = true;
        }
      });
      this.rightSection.appendChild(this.restartButton);
    }
  }, {
    key: "generateProgressBar",
    value: function generateProgressBar() {
      var _this4 = this;

      this.progressBar = document.createElement("progress");
      this.progressBar.value = 0;
      this.progressBar.max = 1;
      this.progressBar.addEventListener("click", function (event) {
        // Update current time
        var percent = event.offsetX / _this4.progressBar.offsetWidth;
        _this4.audioElement.currentTime = percent * _this4.audioElement.duration;
        _this4.progressBar.value = percent;
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
    key: "generateCoverArt",
    value: function generateCoverArt() {
      this.coverArtElement = document.createElement("img");

      if (this.hasAttribute("img")) {
        this.coverArtElement.src = this.getAttribute("img");
      } else {
        this.coverArtElement.src = "music-note.jpg";
      }

      this.rightSection.appendChild(this.coverArtElement);
    }
  }, {
    key: "setTime",
    value: function setTime() {
      var _this5 = this;

      if (this.hasAttribute("src")) {
        this.audioElement.onloadedmetadata = function () {
          _this5.timeElement.textContent = _this5.convertToMMSS(_this5.audioElement.currentTime) + " / " + _this5.convertToMMSS(_this5.audioElement.duration);

          _this5.audioElement.ontimeupdate = function () {
            _this5.progressBar.value = _this5.audioElement.currentTime / _this5.audioElement.duration;
            _this5.timeElement.textContent = _this5.convertToMMSS(_this5.audioElement.currentTime) + " / " + _this5.convertToMMSS(_this5.audioElement.duration);

            if (_this5.audioElement.currentTime === _this5.audioElement.duration) {
              _this5.playing = false;
              _this5.audioElement.currentTime = 0;
              _this5.playPauseButton.className = _this5.playPauseButton.className.replace("pause", "play");

              _this5.playPauseButton.setAttribute("aria-label", "Play Button");
            }
          };
        };
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

  return audoTool;
}(_wrapNativeSuper(HTMLElement));

customElements.define("audio-tool", audoTool);