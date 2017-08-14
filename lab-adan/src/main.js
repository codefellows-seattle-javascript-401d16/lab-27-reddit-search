
import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

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
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.topics.length === 0)
      return (<p></p>);
    let results = [];
    this.props.topics.data.children.forEach(topic => {
      results.push(
        <li key={topic.data.id}>
          <a href={topic.data.url}>
            <h2>{topic.data.title}</h2>
            <p>{topic.data.ups}</p>
          </a>
        </li>
      );
    });
    return (
      <ul>
        {results}
      </ul>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    this.redditRequest = this.redditRequest.bind(this);
  }

  redditRequest(board, resultLimit) {
    superagent.get(`${API_URL}/${board}.json?limit=${resultLimit}`) // it always seems to return the stickies no matter the result limit
      .then(res => {
        this.setState({ topics: res.body });
        document.getElementById('search-form').className = '';
      })
      .catch(err => {
        document.getElementById('search-form').className = 'error';
        this.setState({ topics: [] });
      });
  }

  render() {
    return (
      <div>
        <h1>Reddit Search Engine</h1>
        <SearchForm redditRequest={this.redditRequest} />
        <SearchResultList topics={this.state.topics} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
