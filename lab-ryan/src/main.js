import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://reddit.com/r';

// create a form container component every time you create a form
// a form container is a component that holds the state for a forms inputs
class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textInput: '',
      numberInput: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
  }

  handleTextInputChange(e){
    this.setState({textInput: e.target.value});
  }

  handleNumberInputChange(e){
    this.setState({numberInput: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.searchReddit(this.state.textInput, this.state.numberInput);

  }

  render(){
    return (
      <form>
        <input
          type='text'
          className={this.props.hasError ? 'err' : ''}
          name='redditSearch'
          placeholder='search reddit'
          value={this.state.textInput}
          onChange={this.handleTextInputChange}
        />
        <input
          type='number'
          name='numberInput'
          min='0'
          max='100'
          value={this.state.numberInput}
          onChange={this.handleNumberInputChange}
        />
        <input
          type='submit'
          name='submitButton'
          value='search'
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

//should recieve an array of reddit artiles through props
class RedditArticleList extends React.Component {
  constructor(props){
    super(props)
    this.state = {};
  }
  render(){
    let articles = this.props.articles || [];
    return (
      <ul>
        {articles.map((item , i) =>
          <li key={i}>
            <a href={item.data.url}> {item.data.title} </a>
          </li>
        )}
      </ul>
    );
  }
}

// App's job is to hold all applicaiton state
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      results: null,
      searchErrorMessage: null,
    };

    this.searchReddit = this.searchReddit.bind(this);
  }

  componentDidUpdate(){
    console.log(':::STATE:::', this.state);
  }

  redditBoardFetch(board){
    superagent.get(`${API_URL}/${board}.json`)
      .then(res => {
        console.log('request succes', res);
        this.setState({
          results: res.body.data.children,
          searchErrorMessage: null,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          results: null,
          searchErrorMessage: `Unable to find the reddit board ${board}.`,
        });
      });
  }

  render(){
    return (
      <main>
        <h1> cool beans </h1>
        <SearchForm
          title='Reddit Board'
          handleSearch={this.redditBoardFetch}
        />
        {renderIf(this.state.results,
          <RedditArticleList articles={this.state.results} />)}

        {renderIf(this.state.searchErrorMessage,
          <p> {this.state.searchErrorMessage} </p>)}
      </main>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
