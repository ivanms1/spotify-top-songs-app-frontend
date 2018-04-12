import React, { Component } from 'react';
import './App.css';
import TrackList from './components/track-list';
import qs from 'qs';
import axios from 'axios';

class App extends Component {
  constructor(props){ 
    super(props);

    this.state = { serverData: [], userId: '', uriList: {}, playlistId: ''}

    this.createPlaylist = this.createPlaylist.bind(this);

  }

  componentDidMount(){
    let parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=25', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => {
      console.log(data)
      this.setState({ serverData: data.items.sort((track, next) => next.popularity - track.popularity), });
    });

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => {
      this.setState({ userId: data.id }, () => console.log(this.state.userId));
    })

  }

  createPlaylist(){
    let parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let accessToken = parsed.access_token;

    this.setState({ uriList:  this.state.serverData.map((track) => track.uri) });

    axios.post(`https://api.spotify.com/v1/users/${this.state.userId}/playlists`, {
      "name": "Top 25",
      "description": "25 most played songs",
      "public": false
    }, { headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json'}
    })
    .then((res) => {
      this.setState({playlistId: res.data.id});
      const uriList = this.state.uriList;
      console.log(uriList);
      axios.post(`https://api.spotify.com/v1/users/${this.state.userId}/playlists/${this.state.playlistId}/tracks`,
        { "uris": uriList },
        { headers: {'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json' }
    })
    .then(() => alert('Playlist successfully created'))
    .catch((err) => console.log(err))
    })

  }



  render() {
    return (
      <div className="App">
          <h1 className="App-title">Your top 25 tracks</h1>
          <TrackList tracks={this.state.serverData} />
          <button onClick={this.createPlaylist}>Create Playlist</button>

      </div>
    );
  }
}

export default App;
