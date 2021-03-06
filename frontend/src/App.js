import React, {Component} from 'react';
import './App.css';

import Intro from './Screens/Intro.js';
import LoginCallback from './Spotify/LoginCallback.js';
import WebPlayback from './Spotify/WebPlayback.js';
import Search from './Spotify/Search.js'
import Queue from './Queue/Queue.js'

import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

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
      userAccessToken,
    } = this.state

    // show queue on side (figure out update, possibly update when addtoqueue, delete or element switch)

    //store token better so no more logging in (refresh token?)

    //figure out creating group or joining a queue

    //add a player

    //fix css

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {userAccessToken && 
          <div>
            <h1>QueueUp</h1>
            <WebPlayback token={this.state.userAccessToken} />
            <br/>
            <Search token={this.state.userAccessToken}/>
            <Queue/>
            <NotificationContainer/>
          </div>
        }
      </div>
    )
  }
}

export default App;
