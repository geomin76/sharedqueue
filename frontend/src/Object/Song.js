import React, {Component} from "react";
import classes from "./Song.module.css"


function addToQueue(name, songId, suggestedBy, img) {
    var url = "http://localhost:8080/api/addToQueue?code=9678%204518"
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
        this.state = {
            img: "No image available",
        }
    }

    async componentDidMount() {
        const { album } = await this.props.items;
        if (album) {
            this.setState({
                img: album.images[0].url
            })
        }
    }

    toggleButtonState = () => {
        addToQueue(this.props.items.name, this.props.items.uri, "Geo", this.state.img)
    }

    render() {
        //figure out song img bug, not loading properly or getting reset, possible if statement inside html

        //add a notif that shows it was added to queue

        //fix css, make it more list view and add artist and duration
        return (
            <div className={classes.Container}>
                <div className={classes.Title}>
                    <p>{this.props.items.name}</p>
                </div>
                <div className={classes.Image}>
                    <img height="200" src={this.state.img}/>
                </div>
                <br></br>
                <button onClick={this.toggleButtonState}>Add to Queue</button>
            </div>
        )
    }
}

export default Song;
