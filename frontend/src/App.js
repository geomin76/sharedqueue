import React, {Component} from 'react';
import './App.css';
import Intro from './Screens/Intro.js';
import LoginCallback from './Spotify/LoginCallback.js';
import WebPlayback from './Spotify/WebPlayback.js';
import Search from './Spotify/Search.js'
import Queue from './Queue/Queue.js'

window.onSpotifyWebPlaybackSDKReady = () => {};

class App extends Component {

  //figure out how to store token in a better form rather than this.state (JWT?)

  constructor(props) {
    super(props);
    this.state = {
      userAccessToken: null
    }
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

    // show queue on side

    //store token better so no more logging in

    //figure out creating group or joining a queue

    //add a player

    //fix css

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {userAccessToken && 
          <div>
            <h1>Hello, World!</h1>
            <WebPlayback token={this.state.userAccessToken} />
            <br/>
            <Search token={this.state.userAccessToken}/>
            <Queue/>
          </div>
        }
      </div>
    )
  }
}

export default App;
