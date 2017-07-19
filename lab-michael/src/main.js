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
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }


  handleSearchChange(e){
    this.setState({searchName : e.target.value})
  }

  handleLimitChange(e){
    this.setState({searchFormLimit : e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state.searchName)
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
      type = 'text'
      name = 'redditSearch'
      min = '0'
      max = '100'
      placeholder = 'reddit topic number!!!'
      value = {this.state.searchFormLimit}
      onChange = {this.handleLimitChange}
      />
      <button
        onClick = {this.handleSubmit} > Search !
      </button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditSearchResult: null,
      redditSearchError:null,
    }

    this.redditSearch = this.redditSearch.bind(this)
  }
  redditSearch(searchName, searchLimit){
    console.log(searchName, searchLimit);
    superagent.get(`https://www.reddit.com/r/${searchName}.json?limit=${searchLimit}`)
    .then(res => {
      console.log(res);
      this.setState({
        redditSearchResult: res.body.data.children,
      })
      console.log(this.state.reddit);
      this.state.redditSearchResult.map(object => {
        console.log(object.title);
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        redditSearchError:err,
      })
    })
  }

  render() {
    return(
      <div>
        <h1> REDDIT SEARCH </h1>
        <RedditForm redditSearch={this.redditSearch} />

      {this.state.redditSearchResult ?
        <div>
          <h2> reddit search results! </h2>
          <ul>
          {this.state.redditSearchResult.map((object, i) => {
            console.log(object);
            return (

              <li key={i}>
              <a href={object.data.url}> <p> {object.data.title} </p> </a>
              </li>
            )
          })}
          </ul>
        </div> :
        <p> nope didnt work! Here is the error! {this.state.reddiSearchError} </p>
      }
      </div>
        // {this.state.SearchError ?
        //   <div>
        //     <h2> reddit search {this.state.redditSearchError} does not exist </h2>
        //     <p> try again! </p>
        //   </div> :
        //   <div>
        //   {this.state.redditSearchResult ?
        //     <div>
        //       <h2> search results for {this.state.redditSearchResult} ... </h2>
        //   :
        //   <div>
        //     <p> make a request </p>
        //   </div>
        //   }
        // }
    )

  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDom.render(<App />, div);
