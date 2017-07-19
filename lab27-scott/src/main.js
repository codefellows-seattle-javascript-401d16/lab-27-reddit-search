import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

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
    e.preventDefault();
    console.log('form was submitted');
    this.props.handleRedditRequest(this.state.searchFormBoard, this.state.searchFormLimit)
  }

  render(){
    return (
      <div>
        <form>
          <input
          type = 'text'
          name = 'boardName'
          placeholder = 'Board Name'
          value = {this.state.searchFormBoard}
          onChange = {this.handleBoardNameChange}
          />
          <input
          type = 'number'
          name = 'resultsLimit'
          min = '0'
          max = '100'
          placeholder = 'Quantity'
          value = {this.state.searchFormLimit}
          onChange = {this.handleResultsLimitChange}
          />
          <input type='submit' name='submit' value='submit' onClick={this.handleOnFormSubmit}/>
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
    }
    //put this. methods here
    this.handleRedditRequest = this.handleRedditRequest.bind(this);
  };

  //request to reddit from onsubmit handler in search form
  handleRedditRequest(searchFormBoard, searchFormLimit){
    superagent.get(`http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`)
    .then(res => {
      console.log('children', res.body.data.children);
      this.setState({topics: [res.body.data.children]});
      console.log(this.state.topics);
    })
    .catch(err => console.log(err))
  };

  render(){
    return (
      <div>
        <h1>Reddit Board Search</h1>
        <SearchForm handleRedditRequest={this.handleRedditRequest}/>
        <SearchResultList topics={this.state.topics}/>
      </div>
    )
  }
};

class SearchResultList extends React.Component{
  constructor(props){
    super(props);
    this.state ={};
    console.log('result props', this.props);
  }

  render(){
    console.log('result props break topics', this.props.topics);
    let redditList = this.props.topics.map((item, i) => {
      console.log('item.data.url', item);
      return (
        <li key={i}>
          <a href={item[i].data.url}>
            <h1>{item[i].data.title}</h1>
            <p>{item[i].data.ups}</p>
          </a>
        </li>
      )
    })
    return(
      <div>
        <ul>
          {redditList}
        </ul>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
