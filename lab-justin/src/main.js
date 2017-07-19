import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'
import './style/main.scss'

const API_URL = 'http://www.reddit.com/r'

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      textInput: '',
      numberInput: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
  }

  handleTextInputChange(e){
    this.setState({textInput: e.target.value})
  }

  handleNumberInputChange(e){
    this.setState({numberInput: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
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
          placeholder='number of results you want'
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
      <div>
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
      hasError: false,
    }
    this.searchReddit = this.searchReddit.bind(this);
  }

  searchReddit(name, limit){
    superagent.get(`${API_URL}/${name}.json?limit=${limit - 2}`)
    .then(res => {
      console.log('res', res.body);
      this.setState({
        topics: res.body.data.children
      })
    })
    .catch(err => {
      console.log('err', err);
      this.setState({
        hasError: true
      })
    })
  }

  render(){
    return (
      <div>
        <h1> Search Reddit </h1>

        <SearchForm
        searchReddit={this.searchReddit}
        hasError={this.state.hasError} />

        <SearchResultList topics={this.state.topics}/>
      </div>
    )
  }

}



// create a place to put the app
const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)