const express = require('express');
const fetch = require('node-fetch');

const app = express();
const targetBaseUrl = 'https://www.googleapis.com/youtube/v3/search';

const apiKey = process.env.API_KEY;

function queryyoutube(req, res) {
  var params = "?" + "q=fitness,cardio,30,min" + "&" + "key=" + apiKey + "&part=id,snippet" + "&type=video" + "&maxResults=10"
  console.log(targetBaseUrl + params)
  fetch(targetBaseUrl + params)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    for(i = 0; i < 10; i++) 
    {
     console.log(data.items[i].id)
    }
  })
  .catch(err => console.log(err))
}

function handleRedirect(req, res) {
  queryyoutube();
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}
queryyoutube();
app.get('*', queryyoutube);

const port = process.env.port || 3000;
//app.listen(port);
//for (i = 0; i = 9; i++) {
  //console.log(data.items[i].id);
  //{break;}}
  //+ "&type=video" + "&maxResults=10"