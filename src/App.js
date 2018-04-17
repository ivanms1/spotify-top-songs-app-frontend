import React, { Component } from 'react';
import qs from 'qs';
import axios from 'axios';

import './App.css';
import TrackList from './components/track-list';
import FormData from './components/form-data';

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
      "name": `Top ${this.state.limit}`,
      "description": `Your ${this.state.limit} most played songs`,
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

    if(this.state.serverData){
      this.setState( {serverData: null } )
    }
    let parsed = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    let accessToken = parsed.access_token;

    fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${this.state.timeFrame}&limit=${this.state.limit}&offset=5`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => {
      this.setState({ serverData: data.items.sort((track, next) => next.popularity - track.popularity), });
    });

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
    .then(data => {
      this.setState({ userId: data.id } );
    })
  }



  render() {
    return (
      <div className="App">
      <div className="header">
        <h1 className="title">Your most played songs on Spotify <i class="fab fa-spotify"></i></h1>
        <p>Find your most played songs and make them a playlist on your account</p>
      </div>
          <FormData setLimit={this.setLimit}
                    setTime={this.setTime}
                    createList={this.createList}/>
          {this.state.serverData ?
            <div>
            <TrackList tracks={this.state.serverData} />
            <h1 className="action-call2">Create a playlist on your <i class="fab fa-spotify"></i> acccount</h1>
            <button className='create-playlist' onClick={this.createPlaylist}>Create Playlist</button>
            </div> : null
          }
      </div>
    );
  }
}

export default App;
