const express = require('express');
let app = express();
var bodyParser = require('body-parser');
var getReposByUsername = require('./../helpers/github.js');
var save = require('./../database/index.js');
var fetch = require('./../database/index.js');
var db = require('./../database/index.js');

var sendToDB = function(username, testData){
  // console.log(testData)
  console.log(username)
  save.save(testData, username)
}

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('req-body', req.body)



  //req.body.data is the input/query from the client

  getReposByUsername.getReposByUsername(sendToDB, req.body.data)



  //req.send needs to eventually send the data from github
  res.send()

});

app.get('/', function(req, res){
  db.Repo.find({}, function(err, data){
    res.send(data)
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // var dataFromDB = fetch.fetch()
  // console.log('datafromDB', dataFromDB)
  // res.send(dataFromDB)
  db.Repo.find({}, function(err, data){
    // console.log('DATA HERE', data)
    res.send(data)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
