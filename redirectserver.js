const express = require('express');
const fetch = require('node-fetch');

const app = express();
const targetBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

const apiKey = process.env.API_KEY;
console.log("Give the key API_KEY=**** (retrieve it via https://console.developers.google.com/apis7credentials)")
console.log("if on computer: type in browser: http://localhost:3000/video?q=a,b,c")
console.log("if on raspberrypi: type in browser: http://192.168.0.91:3000/video?q=a,b,c")
console.log("a,b,c are whichever keywords. Put as many as you want separated by a comma")

function queryyoutube(req, res) {
  var params = "?q=" + req.query.q + "&" + "key=" + apiKey + "&part=id,snippet" + "&type=video" + "&maxResults=25" // construction of the URL we'll be redirected to
  console.log("key = " + apiKey)
  console.log(targetBaseUrl + params)
  fetch(targetBaseUrl + params)
  .then(response => response.json())
  .then(data => {
    const youtubeURL ="https://www.youtube.com/watch?v="
    
    var listlink = [youtubeURL + data.items[0].id.videoId];
    var listTitle = [data.items[0].snippet.title];
       
    for(i = 1; i < data.items.length; i++) {
      listlink[i] = youtubeURL + data.items[i].id.videoId;
      listTitle[i] = youtubeURL + data.items[i].id.videoId + " title: " + data.items[i].snippet.title;
    
    } // for loop to construct the list of URL based on the list of videoID returned by the YT API
    console.log(listTitle)
    const picknumber = Math.floor(Math.random() * listlink.length); // to randomise which URL is picked
    const randompick = listlink[picknumber];
    res.redirect(randompick);
    //console.log(picknumber)
  })
  .catch(err => console.log(err))
}

app.get('/video', queryyoutube);

const port = process.env.port || 3000;
app.listen(port);
//http://localhost:3000/video?q=non%20newtonian%20fluid,%20how%20to