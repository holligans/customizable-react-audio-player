import React, { Component } from "react";
import "./App.css";
import AudioPlayer from "./player";
import NewPlayer from "./NewPlayer";
class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const audioFile =
      "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3";

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
