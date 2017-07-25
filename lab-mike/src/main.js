import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subredditName: '',
      responsesToReturn: '',
      inputError: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubredditNameChange = this.handleSubredditNameChange.bind(this);
    this.handleResponsesToReturnChange = this.handleResponsesToReturnChange.bind(this);
  }
  handleSubredditNameChange(event) {
    this.setState({subredditName: event.target.value});
  }

  handleResponsesToReturnChange(event) {
    this.setState({responsesToReturn: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    superagent.get(`${API_URL}/${this.state.subredditName}.json?limit=${this.state.responsesToReturn}`)
      .then((res) => {
        this.setState({
          inputError: null,
        });
        this.props.redditSearch(res.body.data.children);
      })
      .catch((err) => {
        this.setState({
          inputError: true,
        });
      });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}  >
        <input
          className={ this.state.inputError ? 'error' : ''}
          type='text'
          name='subredditName'
          placeholder='Subreddit Name'
          value={this.state.subredditName}
          onChange={this.handleSubredditNameChange}
        />
        <input
          className={ this.state.inputError ? 'error' : ''}
          type='number'
          min='0'
          max='100'
          name='responsesToReturn'
          placeholder='Responses To Return'
          value={this.state.responsesToReturn}
          onChange={this.handleResponsesToReturnChange}
        />
        <input type="submit" />
      </form>
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        { this.props.topics.length ?
          <ul>
            {this.props.topics.map((item, i) => {
              return (
                <li key = {i}>
                  <a href = {item.data.url}>
                    <h4>{item.data.title}</h4>
                    <p>{item.data.ups}</p>
                  </a>
                </li>
              );
            }
            )}
          </ul>
          :
          <p> Choose a subreddit and return number of posts </p>
        }
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
    this.redditSearch = this.redditSearch.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  redditSearch(redditResults) {
    this.setState({
      topics: redditResults,
    });
  }
  render() {
    return (
      <div>
        <h1>Reddit Form</h1>
        <SearchForm redditSearch = {this.redditSearch} />
        <SearchResultList topics = {this.state.topics} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
