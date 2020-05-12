const express = require('express');
const app = express();

app.get('/json', (request, response) => {
    response.status(200).json({"name": "Robbie"});
  });

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
