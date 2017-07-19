import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'https://www.reddit.com/r'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      topics: [],
    }
    this.redditSelect = this.redditSelect.bind(this)
  }

  redditSelect(board, searchLimit){
    superagent.get(`${API_URL}/${board}.json?limit=${searchLimit}`)
    .then(res => {
      console.log(res.body.data.children)
      this.setState({ topics: res.body.data.children})
    })
  }

  render(){
    return(
      <div>
      <SearchForm redditSelect={this.redditSelect}/>
      <SearchResultList topics={this.state.topics}/>
      </div>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      board: '',
      searchLimit: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handleLimitChange = this.handleLimitChange.bind(this)
  }

  handleBoardChange(e){
    this.setState({board: e.target.value})
  }

  handleLimitChange(e){
    this.setState({searchLimit: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.redditSelect(this.state.board, this.state.searchLimit)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='board'
          placeholder='Choose a subreddit'
          value={this.state.board}
          onChange={this.handleBoardChange}
          />
        <input
          type='number'
          name='searchLimit'
          placeholder='Number between 1-100'
          min='0'
          max='100'
          value={this.state.searchLimit}
          onChange={this.handleLimitChange}
          />
        <input
          type='submit'
          name='submitButton'
          value='Submit'
          />
      </form>
    )
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <h1> Search Results </h1>
        <ul>
          {this.props.topics.map((item) => {
            return (
              <li key={item.data.id}>
                <a href={item.data.url}>
                <h1>{item.data.title}</h1>
                <p>{item.data.ups}</p>
                </a>
              </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
