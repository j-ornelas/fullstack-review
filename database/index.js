const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    "id": Number,
    "name": String,
    "full_name": String,
    "owner": {
      "login": String,
      "id": Number,
      "avatar_url": String,
      "gravatar_id": String,
      "url": String,
      "html_url": String,
      "followers_url": String,
      "following_url": String,
      "gists_url": String,
      "starred_url": String,
      "subscriptions_url": String,
      "organizations_url": String,
      "repos_url": String,
      "events_url": String,
      "received_events_url": String,
      "type": String,
      "site_admin": Boolean
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
