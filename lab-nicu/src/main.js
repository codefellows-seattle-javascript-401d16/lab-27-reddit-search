import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';


class SearchResultList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let results = this.props.results || [];
    console.log(results)
    return (

      <ul>
        {results.map((ele, index) => {

          return <li key={index}>
            <a href={ele.data.url}>{ele.data.title}</a>
          </li>
        })

        }
      </ul>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormLimit: 0,
      searchFormBoard: '',
    }
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleFormLimitChange = this.handleFormLimitChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleBoardChange(e) {
    this.setState({ searchFormBoard: e.target.value })
  }

  handleFormLimitChange(e) {
    this.setState({ searchFormLimit: e.target.value })
  }
  handleFormSubmit(e) {
    e.preventDefault();
    this.props.searchBoard({ boardName: this.state.searchFormBoard, limit: this.state.searchFormLimit })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type='text'
          name='board'
          placeholder='Name of Board'
          value={this.state.searchFormBoard}
          onChange={this.handleBoardChange}
        />
        <input
          type='number'
          name='formLimit'
          min='0'
          max='100'
          value={this.state.searchFormLimit}
          onChange={this.handleFormLimitChange}
        />
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      boardSearchError: '',
    }

    this.searchBoard = this.searchBoard.bind(this);
  }

  searchBoard(info) {
    let { boardName, limit } = info;
    console.log('Board Name =', boardName);
    console.log('Limit =', limit);
    superagent.get(`http://www.reddit.com/r/${boardName}.json?limit=${limit}`)
      .then(res => {
        console.log('Request Result', res.body)
        this.setState({
          results: res.body.data.children,
          boardSearchError: null,
        })
      })
      .catch(console.error)
  }

  render() {
    return (
      <div>
        <h1>Reddit Board Search</h1>
        <SearchForm searchBoard={this.searchBoard} />
        <SearchResultList results={this.state.results} />
      </div>
    )
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);