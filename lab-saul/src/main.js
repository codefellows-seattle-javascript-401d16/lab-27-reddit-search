import React from 'react';
import './style/main.scss';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r/';

class RedditResultList extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <ul>
        {this.props.topics.map((item, i) => {
          return (
            <li key={i}>
              <a href={item.data.url}> {item.data.ups}-{item.data.title} </a>
             </li>
          )
        })}
      </ul>
    )
  }
}

class RedditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      topics: [],
      hasError: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.handleNumberInput = this.handleNumberInput.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('nothing is happening')
      superagent.get(`${API_URL}${this.state.topic}.json?limit=${this.state.count}`)
        .then(res => {
          this.setState({
            topics: res.body.data.children
          })
        })
        .catch(err => {
          this.setState({
            hasError: true
          })
        })
  }

  handleTextInput(e){
    this.setState({topic: e.target.value})
  }

  handleNumberInput(e){
    this.setState({count: e.target.value})
  }

  render(){
    console.log(this.state, 'this.state')

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            className={this.state.hasError ? 'err' : ''}
            name='redditBoardText'
            placeholder='Input Reddit Board'
            onChange={this.handleTextInput}
          />
          <input
            type='number'
            min='0'
            max='100'
            name='redditBoardNumber'
            placeholder='Input # of Posts'
            onChange={this.handleNumberInput}
          />
          <button> Click Me! </button>
        </form>
        <RedditResultList topics={this.state.topics}/>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>reddit form</h1>

        <RedditForm />

      </div>
    )
  }
}

const container = document.createElement('div');
document.body.appendChild(container)
ReactDom.render(<App />, container)
