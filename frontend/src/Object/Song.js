import React from "react";
import classes from './Song.module.css'

const SongCard = props => {
    const { name, popularity, available_markets, album } = props.items;
    var img = "No image available"
    if (album) {
        img = album.images[0].url
    }

    function pushToQueue() {

    }

    return(
        <div className={classes.Container}>
            <div className={classes.Title}>
                <p>{name}</p>
            </div>
            <div className={classes.Image}>
                <img height="200" src={img}/>
            </div>
        </div>
    )
}

export default SongCard;