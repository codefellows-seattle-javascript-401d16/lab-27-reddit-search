import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class SearchResultList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
        {this.topics.map((item, i) => {
                return (
                  <li key={i}>
                    <p> {item.title} </p>
                    <p> {item.url} </p>
                    <p> {item.ups} </p>
                  </li>
                )
              })}
        </ul>
      </div>
    );
  }
}

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subreddit: '',
      limit: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handlesSubredditChange = this.handlesSubredditChange.bind(this);
  }

  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }

  handlesSubredditChange(e) {
    this.setState({subreddit: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.requestSubreddit(this.state.subreddit, this.state.limit);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input
            type='text'
            name='subreddit'
            placeholder='subreddit'
            value={this.state.subreddit}
            onChange={this.handlesSubredditChange}
          />
        </form>
        <input
        type='number'
        name='searchLimit'
        placeholder='number of results (1-100)'
        min='1'
        max='100'
        value={this.state.limit}
        onChange={this.handleLimitChange}
        />
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    }
    this.requestSubreddit = this.requestSubreddit.bind(this);
  }

  requestSubreddit(sub, num) {
    superagent.get(`https://www.reddit.com/r/${sub}.json?limit=${num}`)
    .then(res => {
      let posts = res.body.data.children.map(item => {
        return {
          title: item.data.title,
          url: item.data.url,
          ups: item.data.ups,
        }
      });
      console.log(posts);
      this.setState({topics: posts});
    })
    .catch(console.error());
  }
  //TODO: you need a ternary to display nothing when a request has not been made yet.
  render() {
    return (
      <div>
        <h1>Reddit Search</h1>
        <SearchForm requestSubreddit={this.requestSubreddit}/>
        <SearchResultList topics={this.state.topics}/>
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
