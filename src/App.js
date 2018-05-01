import React, { Component } from "react";
import "./App.css";
import AudioPlayer from "./player";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    const audioFile =
      "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3";

    return (
      <main>
        <h1>Hello</h1>
        <AudioPlayer src={audioFile} />
      </main>
    );
  }
}

export default App;
