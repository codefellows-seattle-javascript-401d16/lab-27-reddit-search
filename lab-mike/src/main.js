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
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubredditNameChange = this.handleSubredditNameChange.bind(this);
    this.handleResponsesToReturnChange = this.handleResponsesToReturnChange.bind(this);
  }
  handleSubredditNameChange(event) {
    this.setState({subredditName: event.target.value})
  }

  handleResponsesToReturnChange(event) {
    this.setState({responsesToReturn: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    superagent.get(`${API_URL}/${this.state.subredditName}.json?limit=${this.state.responsesToReturn}`)
      .then((res) => {
        // on success it should pass the results to the application state
        this.props.functiontocall(this.state.subreddit, this.state.responsesToReturn)
        console.log(res.body)
      })
      .catch((err) => {
                // on failure it should add a class to the form called error and turn the form's inputs borders red
        console.log(err.message)
      })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} >
      <input
      type='text'
      name='subredditName'
      placeholder='Subreddit Name'
      value={this.state.subredditName}
      onChange={this.handleSubredditNameChange}
      />
      <input
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
    )
  }
}

class SearchResultList extends React.Component {

  // If there are topics in the application state it should display the unordered list
  // Each list item in the unordered list should contain the following
  // an anchor tag with a href to the topic.url
  // inside the anchor a heading tag with the topic.title
  // inside the anchor a p tag with the number of topic.ups

  constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

class App extends React.Component {
//   should contain all of the application state
// should contain methods for modifying the application state
// the state should have a topics array for holding the results of the search
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    }
  }
  render() {
    return (
      <div>
        <h1>Reddit Form</h1>
        <SearchForm />
        <SearchResultList />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
