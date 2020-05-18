const express = require('express');
const fetch = require('node-fetch');

const app = express();
const targetBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

const apiKey = process.env.API_KEY;

function queryyoutube(req, res) {
  var params = "?q=" + req.query.q + "&" + "key=" + apiKey + "&part=id,snippet" + "&type=video" + "&maxResults=25"
  console.log("key = " + apiKey)
  console.log(targetBaseUrl + params)
  fetch(targetBaseUrl + params)
  .then(response => response.json())
  .then(data => {
    const youtubeURL ="https://www.youtube.com/watch?v="
    var listlink = [youtubeURL + data.items[0].id.videoId];
    
    for(i = 1; i < data.items.length; i++) {
      listlink[i] = youtubeURL + data.items[i].id.videoId;
    
    }
    console.log(listlink)
    const picknumber = Math.floor(Math.random() * listlink.length);
    const randompick = listlink[picknumber];
    res.redirect(randompick);
    console.log(picknumber)
  })
  .catch(err => console.log(err))
}

app.get('/video', queryyoutube);

const port = process.env.port || 3000;
app.listen(port);
//http://localhost:3000/video?q=fitness,30min,cardio