import React, { Component } from "react";
import "./App.css";
import AudioPlayer from "./player";
import NewPlayer from "./NewPlayer";
import Song from "./audio/90Minutos.mp3";
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const audioFile =
      "https://s3.amazonaws.com/sprint-world-cup-2018/90minutos-song/90Minutos.mp3";

    return (
      <main>
        <h1>Audio PLayers</h1>
        <h2>Option 1</h2>
        <AudioPlayer src={audioFile} />
        <br />
        <hr />
        <br />
        <h2>Option 1</h2>
        <NewPlayer src={audioFile} />
      </main>
    );
  }
}

export default App;
