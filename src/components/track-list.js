import React from 'react';
import TrackInfo from './track-info'

function TrackList({tracks}){
	let position = 0;
	const listItems = tracks.map((track) => {
		position++
		return <TrackInfo position={position} key={track.id} name={track.name} artist={track.artists[0].name}/>
	})
	return (
		<ul>
			{listItems}
		</ul>
		)
}

export default TrackList;
