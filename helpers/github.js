const request = require('request');
const config = require('../config.js');

let getReposByUsername = (callback, username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function(error, response, body){
    console.log('statuscode:', response.statusCode)
    var data = JSON.parse(body)
    var repoArr = [];
    // makes an array and pushes the repo names and repo urls
    // for each one.
    for (var i = 0; i < data.length; i++){
      var temp = [];
      temp.push(data[i].name, data[i].url)
      repoArr.push(temp)
    }

    console.log(repoArr)
    callback(repoArr, username)
  })


}

module.exports.getReposByUsername = getReposByUsername;
