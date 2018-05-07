import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-slider/assets/index.css";
import "./styles/newplayer.css";
import { Button, Icon } from "semantic-ui-react";
import song from "./audio/90Minutos.mp3";

const railStyle = {
  backgroundColor: "#757777",
  width: "100%"
};
class NewPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerReady: false,
      durationFormatted: {
        minutes: "00",
        seconds: "00"
      },
      currentTime: 0,
      currentTimeFormatted: {
        minutes: "00",
        seconds: "00"
      },
      muted: false,
      volume: 0,
      trackValue: 0,
      playing: false,
      paused: false
    };
    this.newplayer = new Audio(this.props.src);
  }

  componentWillMount() {
    // getting data from the video and setting up state
    this.newplayer.onloadedmetadata = () => {
      // setting initial volume
      this.newplayer.volume = 0.5;
      // get video duration formatted
      const durationFormatted = this.getTimeFormatted(this.newplayer.duration);
      // setting initial state
      this.setState(
        {
          playerReady: true,
          volume: this.newplayer.volume,
          durationFormatted
        },
        () => {
          this.newplayer.addEventListener("timeupdate", this.updateCurrentTime);
        }
      );
    };
  }
  // update currentTime
  updateCurrentTime = () => {
    const currentTime = this.newplayer.currentTime;
    const timeformatted = this.getTimeFormatted(currentTime);
    this.setState({ currentTime, currentTimeFormatted: timeformatted });
  };
  // this function format the time
  getTimeFormatted(timeToFormat) {
    const totalduration = Math.ceil(timeToFormat);
    const durationMinutes = Math.floor(totalduration / 60);
    const durationSeconds = totalduration % 60;
    const durationTime = {};
    durationTime.minutes =
      durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes;
    durationTime.seconds =
      durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
    return durationTime;
  }
  // play handler
  handlePlay = () => {
    this.newplayer.play();
  };
  // pause handler
  handlePause = () => {
    this.newplayer.pause();
  };
  // mute handler
  handleMute = mute => {
    this.newplayer.muted = mute;
    this.setState({ muted: this.newplayer.muted });
  };
  // track change handler
  handleTrackChange = event => {
    this.newplayer.currentTime = event;
    this.updateCurrentTime();
  };
  // control volume
  handleVolumeChange = event => {
    this.newplayer.volume = event;
    this.setState({ volume: this.newplayer.volume });
  };
  render() {
    const {
      playerReady,
      durationFormatted,
      currentTime,
      currentTimeFormatted,
      muted,
      volume
    } = this.state;
    return (
      <div>
        {playerReady ? (
          <div className="audio-player">
            <div className="audio-player-control">
              <Icon name="play" onClick={this.handlePlay} size={"large"} />
              <Icon name="pause" onClick={this.handlePause} size={"large"} />
            </div>
            <div
              className={
                this.iOS
                  ? "audio-player-rail audio-player-rail-ios"
                  : "audio-player-rail"
              }
            >
              <Slider
                className="audio-track"
                min={0}
                max={this.newplayer.duration}
                step={0.1}
                trackStyle={[{ background: "#fec617" }]}
                handleStyle={[
                  {
                    marginLeft: "0",
                    background: "#fff",
                    border: "0px",
                    width: "6px",
                    height: "15px",
                    borderRadius: "2px"
                  }
                ]}
                railStyle={railStyle}
                value={currentTime}
                onChange={this.handleTrackChange}
              />
            </div>
            <div className="audio-player-timer">
              <div className="currentTime">
                <span>{currentTimeFormatted.minutes}:</span>
                <span>{currentTimeFormatted.seconds}</span>
              </div>
              <div className="time-separator">
                <span>/</span>
              </div>
              <div className="duration">
                <span>{durationFormatted.minutes}:</span>
                <span>{durationFormatted.seconds}</span>
              </div>
            </div>
            <div className="audio-player-volume">
              {!muted ? (
                <Icon
                  name="volume up"
                  onClick={() => this.handleMute(true)}
                  size={"large"}
                />
              ) : (
                <Icon
                  name="volume off"
                  onClick={() => this.handleMute(false)}
                  size={"large"}
                />
              )}
              <Slider
                className="volume-track"
                min={0}
                max={1}
                step={0.1}
                trackStyle={[{ background: "#fec617" }]}
                handleStyle={[
                  {
                    background: "#fff",
                    border: "0px",
                    width: "6px",
                    height: "15px",
                    borderRadius: "2px",
                    marginLeft: "0px"
                  }
                ]}
                railStyle={railStyle}
                value={volume}
                onChange={this.handleVolumeChange}
              />
            </div>
          </div>
        ) : (
          <div className="loader">Loading...</div>
        )}
      </div>
    );
  }
}

export default NewPlayer;
