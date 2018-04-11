import React from 'react';

function TrackInfo ({name, artist}){
	return (
		<li><h3>{name}</h3><p>{artist}</p></li>
		)
}

export default TrackInfo;