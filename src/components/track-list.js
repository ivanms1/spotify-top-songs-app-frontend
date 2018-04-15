import React from 'react';
import TrackInfo from './track-info';

function TrackList({tracks}){
	let position = 0;
	const listItems = tracks.map((track) => {
		position++
		return <TrackInfo position={position}
		art={track.album.images[2] ? track.album.images[2].url : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png'}
		key={track.id} name={track.name}
		artist={track.artists[0].name}/>
	})
	return (
		<div key='grid' className="songsGrid">
			{listItems}
		</div>
		)
}

export default TrackList;
