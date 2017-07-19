import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const keyGen = () => Math.random();

class SearchResultsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.searchResults.map(v =>
          <li key={keyGen()}>
            <a href={v.url}>
              <h1>{v.title}</h1>
              <a>{v.upvotes}</a>
            </a>
          </li>
        )}
      </ul>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '',
      limit: '',
    }
    this.handleBoardInputChange = this.handleBoardInputChange.bind(this);
    this.handleLimitInputChange = this.handleLimitInputChange.bind(this);
  }

  handleBoardInputChange(e) {
    const board = e.target.value;
    this.setState({ board })
  }

  handleLimitInputChange(e) {
    const limit = e.target.value;
    this.setState({ limit })
  }

  render() {
    return (
      <form onSubmit={e => this.props.handleSubmit(e, this.state.board, this.state.limit)}>
        <input placeholder='board' type='text' value={this.state.board} onChange={this.handleBoardInputChange} />
        <input placeholder='limit' type='range' value={this.state.limit} onChange={this.handleLimitInputChange} />
        <input type='submit' />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, board, limit) {
    e.preventDefault()
    superagent.get(`http://www.reddit.com/r/${board}.json?limit=${limit}`)
      .then(res => {
        const searchResults = res.body.data.children.map(v => {
          const title = v.data.title;
          const upvotes = v.data.ups;
          const url = v.data.url;
          return { title, upvotes, url}
        })
        this.setState({ searchResults });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <SearchForm handleSubmit={this.handleSubmit}/>
        { this.state.searchResults && <SearchResultsList searchResults={this.state.searchResults} /> }
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
