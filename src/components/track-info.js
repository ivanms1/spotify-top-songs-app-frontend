import React from 'react';

function TrackInfo ({name, artist, position}){
	return (
		<li><h3>{position} {name}</h3><p>{artist}</p></li>
		)
}

export default TrackInfo;