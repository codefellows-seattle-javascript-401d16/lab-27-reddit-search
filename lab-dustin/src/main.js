import './style/main.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent'
const API_URL = 'https://www.reddit.com/r/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      redditSelected: null,
      redditTitleError: null,
    }
    this.redditSelect = this.redditSelect.bind(this);
  }
  componentDidUpdate(){
    console.log('**_STATE_** ', this.state);
  }
  redditSelect(title, number) {
    console.log('redditSelect reached');
    console.log('TITLE ', `${title}`);
    // if(!this.state.topics[name]) {
    //   this.setState({
    //     redditSelected: null,
    //     redditTitleError: title,
    //   })
    // } else {
      superagent.get(`${API_URL}${title}.json?limit=${number}`)
      .then(res => {
        console.log('selected reddit ', res.body.data);
        this.setState({
          topics: res.body.data.children,
          redditSelected: res.body,
          redditTitleError: null,
        })
      })
      .catch(err => {
        this.setState({
          redditError: true,
        })
      })
    // }
  }
  render() {
    return (
      <div>
        <h1> Reddit Some Schtuff </h1>
        <SearchForm err={this.state.redditError} redditSelect={this.redditSelect}/>
          <SearchResultList pickles={this.state.topics} />
        { this.state.redditTitleError ?
        <div>
          <h2> reddit {this.state.redditTitleError} does not exist!</h2>
          <p> Try again </p>
        </div> :

          <div>
          { this.state.redditSelected ?
          <div>
            <h2> selected {this.state.redditSelected.name}</h2>
            <p> Sonnnnnnnnnnnnnn </p>
          </div> :
          <div>
            <p> Make another request. </p>
          </div>
        }
        </div>
      }
      </div>
      // <div>{this.state.redditSelected}</div>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redditBoard : '',
      redditNumber: '',
      redditError: false,
    }
  this.handleSubmit =  this.handleSubmit.bind(this)
  this.handleRedditChange = this.handleRedditChange.bind(this)
  this.handleRedditNumberChange = this.handleRedditNumberChange.bind(this)
  }
  handleRedditChange(e){
    this.setState({redditBoard: e.target.value})
  }
  handleRedditNumberChange(e){
    this.setState({redditNumber: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault()
    this.props.redditSelect(this.state.redditBoard, this.state.redditNumber)
  }
  render() {
    console.log('8888', this.props)
    return (
      <form onSubmit = {this.handleSubmit} >
        <input
          className = {this.props.err ? 'err' : ''}
          type='text'
          name='redditName'
          placeholder='reddit name'
          value={this.state.redditBoard}
          onChange={this.handleRedditChange}
          />
          <p></p>
          <input
            type='number'
            name='redditNumber'
            placeholder='1-100'
            value={this.state.redditNumber}
            onChange={this.handleRedditNumberChange}
            />
            <p></p>
        <button> Submit to reddit </button>
      </form>
    )
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (

      <div>
        <h1> RESULTS </h1>

        <ul>
          {this.props.pickles.map((item, i) => {
            return (
              <li key ={i}>
                <a href={item.data.url}><h1>{item.data.title}</h1></a>
                <p></p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
