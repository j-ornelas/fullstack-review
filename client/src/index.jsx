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
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this, this.updateState)}/>
      <button onClick={this.getDataFromServer.bind(this, this.updateState)} >Fetch Data Test Button</button>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
