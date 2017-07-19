import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URI = 'https://www.reddit.com/r'

class RedditForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRedditQuery = this.handleRedditQuery.bind(this)
  }

  handleRedditQuery(e){
    this.setState({data: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.redditSelect(this.state.data)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          data='postTitle'
          placeholder='Post Title'
          value={this.state.data}
          onChange={this.handleRedditQuery}
          />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      redditTitle: null,
      redditLookup: {},
      redditSelected: null,
      redditDataError: null,
      }

    this.redditSelect = this.redditSelect.bind(this)
    }
    componentDidUpdate(){
      console.log('___STATE___', this.state);
    }

  redditSelect(data) {
      console.log('about to get');
      superagent.get(`${API_URI}/${data}.json`)
      .then(res => {
        console.log('selected post', res.body);
        this.setState({
          redditTitle: data,
          redditSelected: res.body.kind,
          redditDataError: null,
        })
      }).catch(() => {
        this.setState({
          redditSelected: null,
          redditDataError: data,
        })
      });
    }
  render() {
    return (
      <div>
        <h1>Reddit Request Form</h1>
        <RedditForm redditSelect={this.redditSelect}/>
      {this.state.redditDataError ?
        <div>
        <RedditForm/>
          <h2>Subreddit {this.state.redditDataError} does not exist</h2>
          <p>Try again !</p>
        </div> :
        <div>
        {this.state.redditSelected ?
          <div>
          <RedditForm redditSelect={this.redditSelect}/>
            <h2>Selected {this.state.redditTitle} Subreddit </h2>
          </div> :
          <div>
            <p>Make a request</p>
          </div>
          }
        </div>
        }
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
