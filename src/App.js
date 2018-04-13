import React, { Component } from 'react';
import './App.css';
import TrackList from './components/track-list';
import FormData from './components/form-data';
import qs from 'qs';
import axios from 'axios';

class App extends Component {
  constructor(props){ 
    super(props);

    this.state = { serverData: null,
                    userId: '',
                    uriList: {},
                    playlistId: '',
                    limit: 25,
                    timeFrame: 'medium_term'
                  }

    this.createPlaylist = this.createPlaylist.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.setTime = this.setTime.bind(this);
    this.createList = this.createList.bind(this);

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
      axios.post(`https://api.spotify.com/v1/users/${this.state.userId}/playlists/${this.state.playlistId}/tracks`,
        { "uris": this.state.uriList },
        { headers: {'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json' }
    })
    .then(() => alert('Playlist successfully created'))
    .catch((err) => console.log(err))
    })

  }

  setLimit(e){

    this.setState( { limit: e.target.value }, () => console.log(this.state.limit) )
  }

  setTime(e){
    this.setState( {timeFrame: e.target.value}, () => console.log(this.state.timeFrame) )
  }

  createList(e){
    e.preventDefault();
    let parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let accessToken = parsed.access_token;

    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${this.state.timeFrame}&limit=${this.state.limit}&offset=5`, {
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



  render() {
    return (
      <div className="App">
      <h1 className="title">Your most played songs on Spotify <i class="fab fa-spotify"></i></h1>
          <FormData setLimit={this.setLimit}
                    setTime={this.setTime}
                    createList={this.createList}/>
          {this.state.serverData ?
            <div>
            <TrackList tracks={this.state.serverData} />
            <button onClick={this.createPlaylist}>Create Playlist</button>
            </div>:
            <h1 className='action-call'>Find your most played songs</h1>
          }

      </div>
    );
  }
}

export default App;
