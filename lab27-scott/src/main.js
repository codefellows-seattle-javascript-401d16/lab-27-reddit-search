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
  };


//on input change handler
  handleBoardNameChange(e){
    this.setState = {searchFormBoard: e.target.value}
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
          />
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
  };

  render(){
    return (
      <div>
        <h1>Reddit Board Search</h1>
        <SearchForm />
      </div>
    )
  }
};


ReactDOM.render(<App />, document.getElementById('root'));
