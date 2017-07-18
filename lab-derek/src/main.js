import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent'

const API_URL = 'http://reddit.com/r';

// class SearchForm extends React.Component {
//   constructor(props)
// }

class SearchForm extends React.Component {
  constructor(props){
    super(props)
      this.state ={
        subredditName: '',
      }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlesubredditNameChange = this.handlesubredditNameChange.bind(this);
  }

  handlesubredditNameChange(e){
    this.setState({subredditName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.subredditSelect(this.state.subredditName)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='subredditName'
          placeholder='Sub-Reddit Name'
          value={this.state.subredditName}
          onChange={this.handlesubredditNameChange}
        />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        subredditLookup: {},
        subredditSelected: null,
        subredditNameError: null,
      }

      this.subredditSelect = this.subredditSelect.bind(this)
    }

  subredditSelect(name){
    console.log('hit subredditSelect');
    if(!this.state.subredditLookup[name]){
      this.setState({
        subredditSelected: null,
        subredditNameError: name,
      })
    } else {
      superagent.get(this.state.subredditLookup[name])
      .then(res => {
        console.log('selected subreddit', res.body)
        this.setState({
          subredditSelected: res.body,
          subredditNameError: null,
        })
      })
    .catch(console.error);
    }
  }


  render(){
    return (
      <div>
        <h1>Hello World!</h1>

        <SearchForm subredditSelect={this.subredditSelect}/>
      </div>

    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
