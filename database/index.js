const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    username: String,
    repos: Array,
    createdAt: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (username, repoArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log('dbside', username)
  // console.log('dbside', repoArr)
  var repoEntry = new Repo({username: username, repos: repoArr})
  repoEntry.save(function(err){
    if (err) return handleError
    console.log('username saved: ', username)
  })


}

module.exports.save = save;
