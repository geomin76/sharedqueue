import React, {Component} from 'react';
import Login from '../Spotify/Login.js';

class Intro extends Component {
    buttonClick() {
        Login.logInWithSpotify();
    }

    render() {
        return (
            <div>
                <h1>QueueUp</h1>
                <button onClick={this.buttonClick}>Log in with Spotify</button>
            </div>
        )
    }
}

export default Intro