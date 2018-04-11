import React, { Component } from 'react';
import './App.css';
import TrackList from './components/track-list'

class App extends Component {
  constructor(props){ 
    super(props);

    this.state = { serverData: [] }

  }

  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => {
      this.setState({ serverData: data.items.sort((track, next) => next.popularity - track.popularity)});
    })

  }



  render() {
    return (
      <div className="App">
          <h1 className="App-title">Your top 20 tracks</h1>
          <TrackList tracks={this.state.serverData} />
      </div>
    );
  }
}

export default App;
