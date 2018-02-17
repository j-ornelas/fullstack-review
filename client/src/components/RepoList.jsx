import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    Our library contains {props.repos.length} repos!<br />
    <h4>Most Watched Repos:</h4>
    {props.mostRecent.map((repo) =>
      <div><strong><a href={repo.repoUrl} target="_blank">{repo.repoName}</a></strong> {repo.watching} ppl watching ~ by: <strong>{repo.username}</strong></div>
    )}
  </div>
)

export default RepoList;
