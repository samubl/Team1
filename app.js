
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = '4293c4dc48304434aba4777d650d0c6d'; // Your client id
var client_secret = '91ec585bbb66403f8abbd520784c6d4d'; // Your secret
//var redirect_uri = 'https://a9-team1music.herokuapp.com/callback'; // Your redirect uri
var redirect_uri = 'http://localhost:3000/callback';

//route javascript files 
var userprofile = require('./routes/userprofile');
var favorites = require("./routes/favorites")
var favoritesTemp = require("./routes/favoritesTemp");
var statistics = require("./routes/statistics")
var friends = require('./routes/friends');
var login = require('./routes/login');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(cookieParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//transfer pages across app
app.get('/', login.view);
app.get('/alt', login.viewAlt);
app.get('/userprofile', userprofile.view);
app.get('/Friends', friends.view);
app.get('/Favorites/page_A', favorites.view);
app.get('/Favorites/page_B', favoritesTemp.view);
app.get('/Statistics', statistics.view);

//some routes to handle connecting to spotify
app.get('/connect', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-recently-played user-top-read playlist-read-private';
  //NOTE: all of the above scopes are read-only and are thus pretty safe
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

//handle Spotify's callback
app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null; //authorization code
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        console.log("Using Access Token");
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/userprofile#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } 
      else {
        console.log("Failed Access Token");
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
