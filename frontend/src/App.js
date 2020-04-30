import React, {Component} from 'react';
import './App.css';
import Intro from './Screens/Intro.js';
import LoginCallback from './Spotify/LoginCallback.js';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class App extends Component {
  state = {
    userAccessToken: null,
  }

  componentWillMount() {
    LoginCallback({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
    });
  }
  
  onSuccessfulAuthorization(userAccessToken) {
    this.setState({ userAccessToken });
  }


  render() {
    let {
      userAccessToken
    } = this.state

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {userAccessToken && 
          <div>
            <h1>Hello, World!</h1>
          </div>
        }
      </div>
    )
  }
}
