import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}'

class RedditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchName: '',
      searchFormLimit: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  handleSearchChange(e){
    this.setState({searchName : e.target.value})
  }

  handleLimitChange(e){
    this.setState({searchFormLimit : e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.redditSearch(this.state.searchName, this.state.searchFormLimit)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
      <input
      type='text'
      placeholder='reddit topic search!!!'
      value = {this.state.searchName}
      onChange = {this.handleSearchChange}
      />

      <input
      type='text'
      name='redditSearch'
      placeholder='reddit topic number!!!'
      value = {this.state.searchFormLimit}
      onChange = {this.handleLimitChange}
      />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditLookup: [],
      redditSearchResult: null,
      redditSearchError:null,
    }

    this.redditSearch = this.redditSearch.bind(this)
  }
  redditSearch(searchName, searchLimit){
    superagent.get(`http://reddit.com/r/${searchName}.json?limit=${searchLimit}`)
    .then(res => {
      this.setState({
        redditLookup: res.body.data
      })
      console.log(res.body.data)
    })
    .catch(console.error)
  }

  render() {
    return(
      <div>
        <h1> REDDIT SEARCH </h1>
        <RedditForm redditSearch={this.redditSearch} />
      </div>
    )
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDom.render(<App />, div);
