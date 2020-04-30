import React, {Component} from 'react';
import axios from 'axios';

class WebPlayback extends Component {

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
          var uris = '{"uris": ["spotify:track:4jNQkWhuzqrbqQuqanFFJ6"]}';
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
            console.log("hello!")
        });
      

        this.webPlaybackInstance.on("ready", data => {
            console.log(data.device_id);
            this.play(data.device_id, "spotify:track:4jNQkWhuzqrbqQuqanFFJ6")
        })

        this.webPlaybackInstance.connect();
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