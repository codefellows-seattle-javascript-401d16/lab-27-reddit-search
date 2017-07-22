import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import './style/main.scss';

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchFormBoard: '',
      searchFormLimit: 0,
    }
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this);
    this.handleResultsLimitChange = this.handleResultsLimitChange.bind(this);
    this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this);
    console.log('FORM thisprops: ', this.props);
  };


//on input change handlers
  handleBoardNameChange(e){
    this.setState({searchFormBoard: e.target.value})
  }
  handleResultsLimitChange(e){
    this.setState({searchFormLimit: e.target.value})
  }
//after data is inputted and saved in the new state, on submit will make a key value pair of the new data
  handleOnFormSubmit(e){
    //this will prevent the whole page from reloaded. You would lose all state otherwise.
    e.preventDefault();
    this.props.handleRedditRequest(this.state.searchFormBoard, this.state.searchFormLimit)
  }

  render(){
    return (
      <div>
        <form>
          <input
          className = {this.props.hasErr ? 'err' : ''}
          type = 'text'
          name = 'boardName'
          placeholder = 'Board Name'
          value = {this.state.searchFormBoard}
          onChange = {this.handleBoardNameChange}
          />
          <input
          className = {this.props.hasErr ? 'err' : ''}
          type = 'number'
          name = 'resultsLimit'
          min = '0'
          max = '100'
          placeholder = 'Quantity'
          value = {this.state.searchFormLimit}
          onChange = {this.handleResultsLimitChange}
          />
          <input type='submit' name='submit' value='Submit' onClick={this.handleOnFormSubmit}/>
        </form>
      </div>
    )
  }
};
//start main APP component

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      topics: [],
      hasErr: false,
    }
    //put this. methods here
    this.handleRedditRequest = this.handleRedditRequest.bind(this);
  };

  //request to reddit from onsubmit handler in search form
  handleRedditRequest(searchFormBoard, searchFormLimit){
    superagent.get(`http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res => {
      this.setState({topics: res.body.data.children});
    })
    .catch(err => {
      this.setState({hasErr: true})
    })
  };

  render(){
    return (
      <div>
        <h1>Reddit Board Search</h1>
        <SearchForm
          handleRedditRequest={this.handleRedditRequest}
          hasErr={this.state.hasErr}
        />
        <SearchResultList
          topics={this.state.topics}
          hasErr={this.state.hasErr}
        />
      </div>
    )
  }
};

class SearchResultList extends React.Component{
  constructor(props){
    super(props);
    this.state ={};
  }

  render(){
    let redditList = this.props.topics.map((item, i) => {
      return(
        <li key={i}>
        <a href={item.data.url}>
        <h1>{item.data.title}</h1>
        <p>{item.data.ups}</p>
        </a>
        <img src={item.data.thumbnail} />
        </li>
      )
    })
    return(
      <div>
        {!this.props.hasErr ?
          <div>
              <div>
                <ul>
                  {redditList}
                </ul>
              </div>
          </div>
        :
          <div>
            <p>That is not a real reddit board! Try again.</p>
            <img src='http://i1.kym-cdn.com/entries/icons/facebook/000/000/894/wahmbulance.jpg' />
          </div>
      }
    </div>
  )
}
}


ReactDOM.render(<App />, document.getElementById('root'));
