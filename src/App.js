import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const CLIENT_ID = 'ceb8995553b941fc82eabbed4e9a5192';
const CLIENT_SECRET = 'af833f7379af4d11975f575ad90f7365';

class App extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
