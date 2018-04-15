import React from 'react';

function TrackInfo ({name, artist, position, art}){
	return (
		<div className="songBox">
		
		<h3>{position} {name}</h3>
		<p>{artist}</p>
		<img className='art' src={art} alt="Album image"/>
		</div>
		)
}

export default TrackInfo;