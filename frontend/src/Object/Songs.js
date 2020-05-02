import React from "react";
import Song from './Song'

const Songs = ({ list }) => {
    let songs = <p>Loading...</p>

    if (list) {
        songs = [];
        for (var i = 0; i < list.length; i++) {
            songs.push(<Song name={list[i].name}/>)
        }
    }

    return(
        <div>
            <div>{songs}</div>
        </div>
    )
}

export default Songs;