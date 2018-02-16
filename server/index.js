const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req-body', req.body.data)


  //req.body.data is the input/query from the client




  //req.send needs to eventually send the data from github
  res.send(req.body.data)

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
