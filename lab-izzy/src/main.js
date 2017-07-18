import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r/';

class RedditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics = [];
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTextInput = this.handleTextInput.bind(this)
    this.handleNumberInput = this.handleNumberInput.bind(this)
  }
  // on submit the form should make a request to reddit
  // GET request to http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}
  // on success it should pass results to app state
  // on failure it shoul add a class to the form called error and turn the
  // forms input borders red
  handleSubmit(e){
    e.preventDefault()
    this.props.redditSelect(this.state.topics);
  }
  // text input for user to supply a reddit board to look up
  handleTextInput(e){
    this.setState({})
  }
  // number input for the user to limit the number of results to return
  // number must be less than 0 and greater than 100
  handleNumberInput(e){
    this.setState({})
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='redditBoard'
          placeholder='reddit board'
          value={this.state.topics}
          onChange={this.handleTextInput}
        />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redditBoardLookup: {},
      redditBoardSelected: null,
      redditBoardError: null,
    }

    this.redditSelect = this.redditSelect.bind(this)
  }

  componentDidUpdate(){
    console.log('___STATE___', this.state);
  }

  componentDidMount(){
    console.log('hello world')
    if(localStorage.redditBoardLookup){
      try{
        let redditBoardLookup = JSON.parse(localStorage.redditBoardLookup)
        this.setState({redditBoardLookup})
      } catch(err){
        console.log(err)
      }
    } else {
      superagent.get(`${API_URL}`)
      .then(res => {

        let redditBoardLookup = res.body.results.reduce((lookup, next) => {
          lookup[next.topic] = topic.url;
          return lookup;
        }, {})

        try {
          localStorage.redditBoardLookup = JSON.stringify(redditBoardLookup)
          this.setState({redditBoardLookup})
        } catch(err){
          console.error(err);
        }
      })
      .catch(console.error)
    }
}

redditSelect(topic){
  console.log('reddit select topic')
  if(!this.state.redditBoardLookup[topic]){
    this.setState({
      redditBoardSelected: null,
      redditBoardError: topic,
    })
  } else {
    superagent.get(this.state.redditBoardLookup[topic])
    .then(res => {
      console.log('selected redditBoardLookup', res.body)
      this.setState({
        redditBoardSelected: res.body,
        redditBoardError: null,
      })
    })
    .catch(console.error)
  }
}

render() {
  return (
    <div>
      <h1>reddit form</h1>

      <RedditForm redditSelect={this.redditSelect} />

      { this.state.redditBoardError ?
        <div>
          <h2> reddit {this.state.redditBoardError} does not exist </h2>
          <p> please try again </p>
        </div> :
        <div>
          { this.state.redditBoardSelected ?
            <div>
              <h2> selected {this.state.redditBoardSelected.topic} </h2>
              <p> booya </p>
              <h3> something </h3>
              <ul>
                {this.state.redditBoardSelected.abilities.map((item, i) => {
                  return (
                    <li key={i}>
                      <p> {item.ability.topic} </p>
                     </li>
                  )
                })}
              </ul>
            </div> :
            <div>
              <p> make a selection </p>
            </div>
          }
        </div>
      }
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
