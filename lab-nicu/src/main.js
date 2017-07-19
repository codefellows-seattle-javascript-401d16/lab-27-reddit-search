import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://reddit.com/r'

class SearchForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchFormLimit: 0,
      searchFormBoard: '',
    }
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleFormLimitChange = this.handleFormLimitChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit(this);
  }

  handleBoardChange(){
    this.setState({searchFormBoard: e.target.value})
  }

  handleFormLimitChange(){
    this.setState({searchFormLimit: e.target.value})
  }
  handleFormSubmit(){
    e.preventDefault();
    superagent.get(`${API_URL}/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}`)
      .then(res =>{
        console.log('Request Result', res)
      })
      .catch(console.error)
  }

  render(){
    return(
      <form onSubmit={this.handleFormSubmit}>
        <input
          type= 'text'
          name= 'board'
          placeholder= 'Name of Board'
          value = {this.state.searchFormBoard}
          onChange = {this.handleBoardChange}
        />
        <input
          type='number'
          name='formLimit'
          min= '0'
          max= '100'
          value = {this.state.searchFormLimit}
          onChange = {this.handleFormLimitChange}
        />
        <input
          type='submit'
          value='Submit'
        />
      </form>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
}