const SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste here your credentials
const clientId = 'a74f20195dc442bbae8782c456607d78', // TO CHANGE
    clientSecret = '0c51823a1f0d4f6298bc738ab4979c4d'; // TO CHANGE 

const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    });

const express = require('express');
const app = express();
const hbs = require('hbs');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
    res.render('index');
});


    app.get('/artists', (req, res, next) => {
        let artist = req.query.artist;
        // console.log("req.query", req.query);
        // console.log("artist", artist);
        
        spotifyApi.searchArtists(artist)
        .then(artists => {
            //  console.log(artists.body.artists.items[0])
          res.render('artists', {
            artists: artists.body.artists.items
          });
        })
        .catch(error => {
          console.log("ERR",error)
        })

      });
      app.get('/albums/:artistId', (req, res, next) => {
        let artistId = req.params.artistId
        spotifyApi.getArtistAlbums(artistId)
        .then(albums => {
            // console.log(albums.body.items);
          res.render('albums', {
            albums: albums.body.items
          });
        })
        .catch(error => {
          console.log(error)
        })
      });

      app.get('/tracks/:albumId', (req, res, next) => {
        let albumId = req.params.albumId
        spotifyApi.getAlbumTracks(albumId)
        .then(tracks => {
            console.log(tracks.body.items[0].preview_url);
          res.render('tracks', {
            tracks: tracks.body.items
          });
        })
        .catch(error => {
          console.log(error)
        })
      });






app.listen(3000, () => {
    console.log('listening on port 3000!')
});