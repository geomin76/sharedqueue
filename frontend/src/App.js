import React, {Component} from 'react';
import './App.css';
import Intro from './Screens/Intro.js';
import LoginCallback from './Spotify/LoginCallback.js';
import WebPlayback from './Spotify/WebPlayback.js';
import Search from './Spotify/Search.js'

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

    // search + push functionality

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {userAccessToken && 
          <div>
            <h1>Hello, World!</h1>
            <WebPlayback token={this.state.userAccessToken} />
            <br/>
            <Search token={this.state.userAccessToken}/>
          </div>
        }
      </div>
    )
  }
}

export default App;
