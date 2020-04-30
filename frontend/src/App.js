import React, {Component} from 'react';
import './App.css';
import Intro from './Screens/Intro.js';
import LoginCallback from './Spotify/LoginCallback.js';

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

    return(
      <div className="App">
        {!userAccessToken && <Intro/>}
        {userAccessToken && 
          <div>
            <h1>Hello, World!</h1>
            <p>{this.state.userAccessToken}</p>
          </div>
        }
      </div>
    )
  }
}

export default App;
