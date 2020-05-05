import React, {Component} from "react";
import classes from "./Song.module.css"


function addToQueue(name, songId, suggestedBy, img) {
    var url = "http://localhost:8080/api/addToQueue?code=2324%205661"
    const data = {
        name: name,
        songId: songId,
        suggestedBy: suggestedBy,
        photoCover: img
    }
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

class Song extends Component {
    constructor(props) {
        super(props)
    }


    toggleButtonState = () => {
        if (this.props.items.album) {
            addToQueue(this.props.items.name, this.props.items.uri, "Geo", this.props.items.album.images[0].url)
        }
        else {
            addToQueue(this.props.items.name, this.props.items.uri, "Geo", "No image available")
        }
    }

    render() {
        //add a notif that shows it was added to queue

        //fix css, make it more list view and add artist and duration
        return (
            <div className={classes.Container}>
                <div className={classes.Title}>
                    <p>{this.props.items.name}</p>
                </div>
                {!this.props.items.album && 
                    <div>
                        <p>No image available</p>
                    </div>
                }
                {this.props.items.album && 
                    <div className={classes.Image}>
                        <img height="200" src={this.props.items.album.images[0].url}/>
                    </div>
                }
                <br></br>
                <button onClick={this.toggleButtonState}>Add to Queue</button>
            </div>
        )
    }
}

export default Song;
