import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      worked: true,
      searchFormBoard: '',
      searchFormLimit: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleBoardLimitChange = this.handleBoardLimitChange.bind(this);
  }

  handleBoardNameChange(e) {
    this.setState({ searchFormBoard: e.target.value });
  }
  handleBoardLimitChange(e) {
    this.setState({ searchFormLimit: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();

    this.props.redditBoardSelect(this.state.searchFormBoard);

    superagent
      .get(
        `${API_URL}/${this.state.searchFormBoard}.json?limit=${this.state
          .searchFormLimit - 1}`
      )
      .then(res => {
        this.setState({ worked: true });
        let posts = res.body.data.children;

        return this.props.renderposts(posts);
      })
      .catch(err => {
        console.log(err);
        this.setState({ worked: false });
      });
  }

  render() {
    return (
      <form>
        <input
          className={this.state.worked ? 'notRed' : 'red'}
          type="text"
          name="board"
          placeholder="subreddit name"
          value={this.state.searchFormBoard}
          onChange={this.handleBoardNameChange}
        />
        <input
          className={this.state.worked ? 'notRed' : 'red'}
          type="number"
          name="limit"
          min="1"
          max="100"
          placeholder="number of results to view"
          value={this.state.searchFormLimit}
          onChange={this.handleBoardLimitChange}
        />
        <button onClick={this.handleClick}>search reddit</button>
      </form>
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul id="topics">
        {this.props.redditTopics.map((n, i) => {
          return (
            <li key={i}>
              <a href={n.data.url}>
                <img src={n.data.thumbnail} />
                <h3>
                  {n.data.title}
                </h3>
                <p>
                  ups: {n.data.ups}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      redditBoardSelected: null,
      redditBoardNameError: null
    };

    this.redditBoardSelect = this.redditBoardSelect.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
  }

  renderPosts(posts) {
    this.setState({ topics: posts });
  }

  redditBoardSelect(name) {
    if (!this.state.topics[name]) {
      this.setState({
        redditBoardSelected: null,
        redditBoardNameError: name
      });
    } else {
      superagent
        .get(this.state.topics[name])
        .then(res => {
          this.setState({
            redditBoardSelected: res.body,
            redditBoardNameError: null
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <div>
        <h1> Find SubReddit</h1>

        <SearchForm
          redditBoardSelect={this.redditBoardSelect}
          renderposts={this.renderPosts}
        />
        <SearchResultList redditTopics={this.state.topics} />
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
