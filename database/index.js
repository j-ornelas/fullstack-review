const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    username: String,
    repoName: String,
    repoUrl: String,
    createdAt: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, repoArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log('Repo ARRAY', repoArr)
  for (var i = 0; i < repoArr.length; i++){
    var repoEntry = new Repo({
      username: username,
      repoName: repoArr[i][0],
      repoUrl: repoArr[i][1],
      createdAt: new Date()
    })
    repoEntry.save(function(err){
      if (err) return handleError
    })
  }
}

let returnToServer = (data) => {
  return data;
}

let fetch = (callback) => {
  // db.repos.find()
  // return Repo.find({})
  // callback(Repo.find({}))
  db.Repo.find({}, function(err, data){
    return data
  })
}

module.exports.save = save;
module.exports.fetch = fetch;
module.exports.returnToServer = returnToServer;
module.exports.db = db;
module.exports.Repo = Repo;
