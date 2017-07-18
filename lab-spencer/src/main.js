import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '',
      resultLimit: 0,
    };

    this.handleRedditRequest = this.handleRedditRequest.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleNumResultsChange = this.handleNumResultsChange.bind(this);
  }

  handleRedditRequest(event) {
    event.preventDefault();
    this.props.redditRequest(this.state.board, this.state.resultLimit);
  }

  handleBoardChange(event) {
    this.setState({ board: event.target.value });
  }

  handleNumResultsChange(event) {
    this.setState({ resultLimit: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleRedditRequest} id='search-form'>
        <input
          type='text'
          name='board'
          value={this.state.board}
          onChange={this.handleBoardChange}
        />
        <input
          type='number'
          name='resultLimit'
          min='0'
          max='100'
          value={this.state.resultLimit}
          onChange={this.handleNumResultsChange}
        />
        <input
          type='submit'
          name='searchReddit'
          value='Search'
        />
      </form>
    )
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };

    redditRequest(board, resultLimit) {
      superagent.get(`${API_URL}/${board}.json?limit=${resultLimit}`)
        .then(res => {
          this.setState({ topics: JSON.parse(res.body) });
        })
        .catch(() => {
          document.getElementById('search-form').addClass('error');
        });
    }

    render() {
      return (
        <div>
          <SearchForm redditRequest={this.redditRequest} />
          <SearchResultList />
        </div>
      );
    }
  }
}

ReactDom.render(<App />, document.getElementById('root'));
