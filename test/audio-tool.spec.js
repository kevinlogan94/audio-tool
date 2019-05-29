// Unit Tests for audio-tool
// Created by Kevin Logan

describe("audio-tool test", function() {
  let audioTool;

  beforeEach(function() {
    if (window.audioTool) {
      audioTool = new window.audioTool();
    }
  });

  it("should check if we can test the transpiled and minified javascript file", function() {
    expect(customElements.define).to.exist;
    expect(window.audioTool).to.exist;
    expect(audioTool).to.exist;
  });

  it("should generate an audio element", function() {
    expect(audioTool.audioElement).to.be.undefined;
    audioTool.generateAudioElement();
    expect(audioTool.audioElement).to.exist;
  });

  it("should generate a left, middle, and right section to organize the elements", function() {
    audioTool.generateSections();
  });

  it("should generate a title element", function() {
    //The title element appends itself to the middle section so let's generate it.
    audioTool.generateSections();
    expect(audioTool.titleElement).to.be.undefined;
    audioTool.generateTitle();
    expect(audioTool.titleElement).to.be.exist;
  });

  it("should add styles to the head", function() {
    audioTool.addStyles();
  });

  it("should generate a playPause button", function() {
    audioTool.generateSections();
    audioTool.generatePlayPauseButton();
  });

  it("should generate a progress bar", function() {
    audioTool.generateSections();
    audioTool.generateProgressBar();
  });

  it("should generate a time stamp", function() {
    audioTool.generateSections();
    audioTool.generateTimeStamp();
  });

  it("should generate a restart button", function() {
    audioTool.generateSections();
    audioTool.generateRestartButton();
  });

  it("should generate svgs to communicate the purpose of the buttons to the user", function() {
    audioTool.generateSections();
    audioTool.generatePlayPauseButton();
    audioTool.generateRestartButton();
    audioTool.generateSvgs();
  });

  it("should set the time of the timestamp", function() {
    audioTool.setTime();
  });
});
