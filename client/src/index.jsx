import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSearch: "",
      repos: []
    }
    this.updateState = this.updateState.bind(this);

  }

  updateState(dataFromServer){
    var repos = this.state.repos;
    repos.push(dataFromServer);
    this.setState({repos: repos})
  }

  search (callback, term) {
    console.log(`${term} was searched`);

    $.ajax({

    url: 'http://127.0.0.1:1128/repos',
    type: 'POST',
    data: JSON.stringify({data:term}),
    contentType: 'application/json',
    success: function (data) {

      console.log('success!', data);
      // this.setState({lastSearch: data})
      callback(data)
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.log('failed to load data. something went wrong.');
    }
})

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this, this.updateState)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
