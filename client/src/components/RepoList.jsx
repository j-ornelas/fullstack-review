import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Our library contains {props.repos.length} repos!<br />
    <h4>Recently Added Repos:</h4>
    {props.mostRecent.map((repo) =>
      <div>{repo.repoName} ~ <strong>{repo.repoUrl}</strong> by: {repo.username}</div>
    )}
  </div>
)

export default RepoList;
