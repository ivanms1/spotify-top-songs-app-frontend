import React from 'react';
import TrackInfo from './track-info'

function TrackList({tracks}){
	console.log(tracks)
	const listItems = tracks.map((track) => {
		return <TrackInfo key={track.id} name={track.name} artist={track.artists[0].name}/>
	})
	return (
		<ul>
			{listItems}
		</ul>
		)
}

export default TrackList;
