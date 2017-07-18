import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}'

class redditForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchName: '',

    }
  }

  // this.handleSubmit = this.handleSubmit.bind(this);
  // this.handleSearchChange = this.handleSearchChange.bind(this);

  handleSearchChange(e){
    this.setState({searchName : e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.redditSearch(this.state.searchName)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
      <input
      type='text'
      name='redditSearch'
      placeholder='reddit topic search!!!'
      value = {this.state.searchName}
      onChange = {this.handleSearchChange}
      />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditLookup: {}
      redditResult: null,
      redditError: null,

    }
  }


  componentDidMount(){
    if(localStorage.redditLookup){
      try {
        let redditLookup = JSON.parse(localStorage.redditLookup)
        this.setState({redditLookup})
      } catch(err) {
        console.log(err);
      }
    } else {
      superagent.get(`http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
      .then(res => {
        let redditLookup = res.body.results;

        try {
          localStorage.redditLookup = JSON.stringify(redditLookup)
          this.setState({redditLookup})
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => console.log(err));
    }
  }

  redditSearch(searchName){
    if(!this.state.redditLookup[searchName]){

      this.setState({

      })
    }
  }


  render() {
    return(
      <div>
        <h1> REDDIT SEARCH </h1>
    )
  }
}

const div = document.createElement('div');
document.body.appendChild(div);
ReactDom.render(<App />, div);
