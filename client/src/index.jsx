import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostRecent: [],
      repos: []
    }
    this.updateState = this.updateState.bind(this);
    this.addNewFilesToState = this.addNewFilesToState.bind(this);
    this.getDataFromServer(this.updateState)
  }

  seeMostRecentRepos(repos){
    var reps = repos
    reps.sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    var recentReps = [];
    for (var i = 0; i < 25; i++){
      if (reps[i] === undefined){
        continue;
      } else {
        recentReps.push(reps[i])
      }
    }
    this.setState({mostRecent:recentReps})
  }

  addNewFilesToState(dataFromServer){
    var repos = this.state.repos
    for (var i = 0; i < dataFromServer.length; i++){
      repos.push(dataFromServer[i])
      console.log(repos)
    }
    this.setState({repos:repos})
  }

  updateState(dataFromServer){
    this.setState({repos:dataFromServer})
    console.log('data from server', dataFromServer)
  }

  getDataFromServer(callback){
    console.log('clicked')
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: 'GET',
      // data: JSON.stringify({data:term}),
      contentType: 'application/json',
      success: function (data) {
        console.log('GET success!');
        callback(data)
      },
      error: function (data) {
        console.log('failed to GET data. something went wrong.');
      }
    })
  }

  search (callback, term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: 'POST',
      data: JSON.stringify({data:term}),
      contentType: 'application/json',
      success: function (data) {

        console.log('POST success!', data);
        // this.setState({lastSearch: data})
        callback(data)
        // this.getDataFromServer(this.updateState)

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.log('failed to POST data. something went wrong.');
      }
    })
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList mostRecent={this.state.mostRecent} repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this, this.addNewFilesToState)}/>
      <button onClick={this.getDataFromServer.bind(this, this.updateState)} >Fetch Data Test Button</button>
      <button onClick={this.seeMostRecentRepos.bind(this, this.state.repos)} > See most recent repos</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
