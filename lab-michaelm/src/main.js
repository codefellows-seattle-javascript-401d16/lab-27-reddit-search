import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = `http://www.reddit.com/r`

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      subInput: '',
      resultNumber: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextInputChange = this.handleTextInputChange.bind(this)
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this)
  }
  handleTextInputChange(e) {
    this.setState({subInput: e.target.value})
  }
  handleNumberInputChange(e) {
    this.setState({resultNumber: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.searchReddit(this.state.subInput, this.state.resultNumber)
  }
  render(){
    return (
      <form>
        <input
          type='text'
          name='redditSearch'
          placeholder='search reddit'
          value={this.state.subInput}
          onChange={this.handleTextInputChange}
          />
        <input
          type='number'
          name='resultNumber'
          placeholder='#'
          min='0'
          max='100'
          value={this.state.resultNumber}
          onChange={this.handleNumberInputChange}
          />
        <input
          type='submit'
          name='submitButton'
          value='search'
          onClick={this.handleSubmit}
          />
        </form>
    )
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    let listItems = this.props.topics.map((item) => {
      return (
        <li key={item.data.id}>
        <a href={`http://www.reddit.com/${item.data.permalink}`}  target="_blank">
            <h1>{item.data.title}</h1>
            <p>{item.data.ups}</p>
          </a>
        </li>
      )
    })
    return (
      <div className="results">
        <h1> Results </h1>
        <ul>
            {listItems}
        </ul>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
    }
    this.searchReddit = this.searchReddit.bind(this);
  }

  searchReddit(name, limit){
    superagent.get(`${API_URL}/${name}.json?limit=${limit}`)
    .then(res => {
      this.setState({
        topics: res.body.data.children
      })
    })
  }

  render(){
    return (
      <div className="search-form">
        <h1> Search Reddit </h1>

        <SearchForm searchReddit={this.searchReddit} />

        <SearchResultList topics={this.state.topics}/>
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
