import React, {Component} from 'react';
import axios from 'axios';

class WebPlayback extends Component {

    constructor(props) {
        super(props)

        this.state = {
            device_id: null,
            paused: false,
            code: "2324%205661"
        }
    }

    waitForSpotify() {
        return new Promise(resolve => {
          if ('Spotify' in window) {
            resolve();
          } else {
            window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
          }
        });
      }

    async play(device_id, song_id) {
          var url = "https://api.spotify.com/v1/me/player/play?device_id=" + device_id
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({uris: [song_id]}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.props.token
            }
        })
      }

    async pop() {
    var url = "http://localhost:8080/api/pop?code=" + this.state.code
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.name)
        this.play(this.state.device_id, data.songId);
    });
    }

    //if click next, then get the next song

    //ability to transfer to another device
    
    async setupWebPlaybackEvents() {
        let { Player } = window.Spotify;
        this.webPlaybackInstance = new Player({
            name: "QueueUp",
            getOAuthToken: cb => { cb(this.props.token); }
        });

        this.webPlaybackInstance.on("initialization_error", ({ message }) => {
            console.log(message);
        });
          
        this.webPlaybackInstance.on("authentication_error", ({ message }) => {
            console.log(message);
        });
    
        this.webPlaybackInstance.on("account_error", ({ message }) => {
            console.log(message);
        });
    
        this.webPlaybackInstance.on("playback_error", ({ message }) => {
            console.log(message);
        });

        this.webPlaybackInstance.on("player_state_changed", async state => {
            if (this.state && 
                state.position === 0 && 
                state.track_window.previous_tracks.find(x => x.id === state.track_window.current_track.id) && 
                state.paused &&
                !this.state.paused) {
                    this.pop();
                    this.setState({
                        paused: true
                    })
            }
            
            if (!state.paused) {
                this.setState({
                    paused: false
                })
            }
        });

        this.webPlaybackInstance.nextTrack().then(() => {
            this.pop();
        })

        // change song / position based on state change

        this.webPlaybackInstance.on("ready", data => {
            console.log(data.device_id);
            this.setState({
                device_id: data.device_id
            })
            // this.play(data.device_id, "spotify:track:4jNQkWhuzqrbqQuqanFFJ6")
            this.pop();
        })

        this.webPlaybackInstance.connect();
    }

    nextTrack() {
        this.pop();
    }

    async componentWillMount() {
        await this.waitForSpotify();
        await this.setupWebPlaybackEvents();
    }

    render() {
        return (
            <p>Playing!</p>
        )
    }

}

export default WebPlayback