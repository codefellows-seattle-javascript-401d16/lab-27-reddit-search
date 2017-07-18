import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class SearchForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      subReddit: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubReddit = this.handleSubReddit.bind(this)
  }


  handleSubReddit(e){
    this.setState({subReddit: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.boardSelect(this.state.subReddit)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='subReddit'
          placeholder='enter a subreddit'
          value={this.state.subReddit}
          onChange={this.handleSubReddit}
          />
          <input
            type='number'
            name='resNumber'
            placeholder='1-100'
            min='1'
            max='100'
            value={this.state.subReddit}
            onChange={this.handleSubReddit}
            />
      </form>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      topics: [],
      boardSelected: null,
      boardNameError: null,
    }
    this.boardSelect = this.boardSelect.bind(this)

  }

  boardSelect(boardName){
    superagent.get(`http://www.reddit.com/r/${boardName}.json`)
    .then(res => {
      this.setState({
        topics: res.body.data.children,
        boardSelected: res.body,
        boardNameError: null,
      })
    })
  }

  render(){
    return(
    <div>
    <SearchForm boardSelect={this.boardSelect} />
    <SearchResultList results={this.state.topics}/>
    </div>
  )
  }
}

class SearchResultList extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props.results);
    return(
      <ul>
       {this.props.results.map((item, i) => {
        return (
        <li key={i}>
        <a href={item.data.url}> <h3>{item.data.title}</h3>
        <h2>{item.data.ups}</h2>
        </a>
        </li>
        )
       })}
       </ul>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
