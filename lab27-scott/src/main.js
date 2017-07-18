import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      SearchFormBoard: '',
      SearchFormLimit: 0,
    }
  };

  render(){
    return (
      <div>
        <form>
          <input
          type='text'
          name='boardName'
          placeholder='Board Name'
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
