import React, { Component } from "react";
import InputRange from "react-input-range";
import "./slider.css";
// play audio
// pause audio
// show audio duration
// show audio current time
// control volumen
// control music track

export default class AudioPlayer extends Component {
  state = {
    playing: false,
    currentTime: "00:00",
    volume: 1,
    audiotrack: 0,
    totalTime: "00:00",
    audio: null,
    duration: 0,
    trackValue: 0
  };
  componentWillMount() {
    const audio = new Audio(this.props.src);
    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      this.setState({ audio, duration });
    };
  }
  playAudio = () => {
    this.state.audio.play();
    this.updateTime("play");
  };
  pauseAudio = () => {
    this.state.audio.pause();
    this.updateTime("stop");
  };
  updateTime = action => {
    let runner = 0;
    if (action === "play") {
      this.timer = setInterval(() => {
        if (this.state.audio.ended) this.updateTime("stop");
        let mins = Math.floor(this.state.audio.currentTime / 60);
        let secs = Math.floor(this.state.audio.currentTime % 60);
        if (secs < 10) {
          secs = "0" + String(secs);
        }
        const timer = mins + ":" + secs;
        this.setState((prevState, props) => ({
          currentTime: timer,
          trackValue: Number(prevState.trackValue) + 1
        }));
      }, 10);
    } else {
      clearInterval(this.timer);
    }
  };
  trackUpdate = e => {
    this.state.audio.pause();
    this.updateTime("stop");
    const currentTimeAdjusted = e.target.value / 100;
    let mins = Math.floor(this.state.audio.currentTime / 60);
    let secs = Math.floor(this.state.audio.currentTime % 60);
    if (secs < 10) {
      secs = "0" + String(secs);
    }
    const timer = mins + ":" + secs;
    const adjustingAudioTime = this.state.audio;
    adjustingAudioTime.currentTime = currentTimeAdjusted;

    this.setState(
      {
        trackValue: e.target.value,
        audio: adjustingAudioTime,
        currentTime: timer
      },
      this.updateTime("update")
    );
  };
  render() {
    const { duration, audio, currentTime, trackValue } = this.state;
    const maxValue = Math.floor(duration * 100);
    return (
      <div>
        <button onClick={this.playAudio}>play</button>
        <button onClick={this.pauseAudio}>pause</button>
        <br />
        <br />
        <span>{duration}</span>
        <br />
        <br />
        <span>{currentTime}</span>
        <br />
        <br />
        <div className="range-slider">
          <input
            step="1"
            className="range-slider__range"
            type="range"
            min="0"
            max={maxValue}
            value={trackValue}
            onChange={e => this.trackUpdate(e)}
          />
        </div>
      </div>
    );
  }
}
