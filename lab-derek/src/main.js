import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props){
    super(props)
      this.state ={
        subredditName: '',
        searchFormLimit: '',
      }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlesubredditNameChange = this.handlesubredditNameChange.bind(this);
    this.handleSearchFormLimitChange = this.handleSearchFormLimitChange.bind(this);
  }

  handlesubredditNameChange(e){
    this.setState({subredditName: e.target.value})
  }

  handleSearchFormLimitChange(e){
    this.setState({searchFormLimit: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.subredditSelect(this.state.subredditName)
    this.props.subredditSelect(this.state.searchFormLimit)
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
        <input
          type='number'
          min='0'
          max='100'
          name='searchFormLimit'
          placeholder='Limit Results?'
          value={this.state.searchFormLimit}
          onChange={this.handleSearchFormLimitChange}
        />
        <button type='submit'></button>
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
        topics: [],
      }

      this.subredditSelect = this.subredditSelect.bind(this)
    }

    componentDidUpdate(){
      console.log('>>>>>>>STATE>>>>>>>', this.state);
    }

    // componentDidMount() {
    //   console.log('Did Mount');
    //   if(localStorage.subredditLookup){
    //     try {
    //       let subredditLookup = JSON.parse(localStorage.subredditLookup)
    //       this.setState({subredditLookup})
    //     } catch(err) {
    //       console.log(err);
    //     }
    //   } else {
    //     superagent.get(`${API_URL}/${this.state.susubredditName}.json?limit=${this.state.searchFormLimit}`)
    //     .then(res => {
    //       console.log('superagent result', res.body);
    //     })
    //   }
    // }

  subredditSelect(name, number){
    console.log('hit subredditSelect');
    superagent.get(`${API_URL}/${name}.json?limit=${number}`)
    .then(res => {
      console.log('selected subreddit', res.body)
      this.setState({
        subredditSelected: res.body.name,
        subredditNameError: null,
        searchFormLimit: res.body.number
      })
    })
    .catch(console.error);
    }
  //
  // searchFormLimitSelect(number){
  //   console.log('hit searchFormLimitSelect');
  //   if(!this.state.subredditLookup[number]){
  //     this.setState({
  //       subredditSelected: null,
  //       subredditNameError: number,
  //     })
  //   } else {
  //     superagent.get(this.state.subredditLookup[number])
  //     .then(res => {
  //       console.log('selected searchFormLimit', res.body)
  //       this.setState({
  //         subredditSelected: res.body,
  //         subredditNameError: null,
  //       })
  //     })
  //   .catch(console.error);
  //   }
  // }

  render(){
    return (
      <div>
        <h1>Hello World!</h1>

        <SearchForm subredditSelect={this.subredditSelect}
        searchFormLimit={this.searchFormLimit}/>

        {this.state.subredditNameError ?
          <div>
            <h2> Subreddit {this.state.subredditNameError} does not exist. </h2>
            <p> Please make another request. </p>
          </div> :
          <div>
            {this.state.subredditSelected}
          </div>
        }

      </div>

    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
