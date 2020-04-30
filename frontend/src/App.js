import React, {Component} from 'react';
import './App.css';
import Intro from './Screens/Intro.js';

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {
  state = {
    userAccessToken: null,
  }

  render() {
    let {
      userAccessToken
    } = this.state

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {/* {userAccessToken} */}
      </div>
    )
  }
}

export default App;
