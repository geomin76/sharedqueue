const express = require('express');
const app = express();
const request = require('request');
var config = require('./config.js');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

var access_token = "";
var refresh_token = "";

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());



app.get('/', (req, res) => {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);


    var scope = "user-library-read user-read-currently-playing user-library-modify playlist-read-private playlist-modify-public playlist-modify-private user-top-read user-modify-playback-state user-read-playback-state";
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: config.client_id,
        scope: scope,
        redirect_uri: config.redirect_uri,
        state: state
    }));
})

app.get('/callback', function(req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/error' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: config.redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(config.client_id + ':' + config.client_secret).toString('base64'))
          },
          json: true
          
        };

        request.post(authOptions, function(error, response, body) {
            if (response.statusCode === 200) {
                refresh_token = body.refresh_token;
                access_token = body.access_token;
                res.redirect('http://localhost:3000/hello');
                // res.redirect(302, "/index.html");
                // res.sendFile(__dirname + "/works.html");
            } 
            else {
                console.log(error);
                console.log(response);
                console.log(body);
                res.redirect('http://localhost:3000/error');
            }
        });
    }
  });

  // app.get('/search', function(req, res) {
  //   var q = req.query.q;
  //   var url = 'https://api.spotify.com/v1/search?' + "q=" + encodeURI(q.toString()) + "&type=track&market=US&limit=10"
  //   var authOptions = {
  //     url: url,
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + access_token
  //     },
  //     json: true
  //   }

  //   const response = fetch(url, {
  //     method: 'GET',
  //     mode: 'cors',
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + access_token
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log(json);      
  //   });
  //   res.redirect("http://localhost:3000/hello")
  //   // res.end();
    
  //   // request.get(authOptions, function(error, response, body) {
  //   //   response.json().then(data => {
  //   //     console.log(data);
  //   //   })
  //   //   // console.log(body);
  //   //   // console.log(body.tracks.href);
  //   //   
  //   // })
  // })



  app.get('/hello', function(req, res) {
    //   console.log(access_token)
      res.send(access_token);
  });

  app.get('/token', function(req, res) {
      res.json({ token: access_token });
  })

  app.get('/error', function(req, res) {
    res.send("error");
  });




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Run http://localhost:3000')
    console.log('Press Ctrl+C to quit.');
})

module.exports = app;