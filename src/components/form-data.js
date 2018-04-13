import React from 'react';

export default function FormData (props) {
	return (
		<form>
            <select className='limitSelect' onChange={props.setLimit} name="number of tracks" id="">
              <option value="25" defaultValue>Choose your playlist length</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <select className='timeSelect' onChange={props.setTime} name="time frame" id="">
            <option value="long_term" defaultValue>Choose your time frame</option>
              <option value="long_term">All time</option>
              <option value="medium_term">Last 6 months</option>
              <option value="short_term">Last month</option>
            </select>
            <button onClick={props.createList}>Create List</button>
          </form>
		)
}