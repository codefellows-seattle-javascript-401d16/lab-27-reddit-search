import './styles/styles.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: null,
      errorMsg: null,
      boardName: '',
      numberLimit: '',
      sample: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this)
    this.handleLimit = this.handleLimit.bind(this)
  }



 handleBoardNameChange(e){
   this.setState({boardName: e.target.value, error: false})
 }
 handleLimit(e){
   this.setState({numberLimit: e.target.value})
 }
 handleSubmit(e){
   e.preventDefault()
   superagent.get(`https://www.reddit.com/r/${this.state.boardName}.json?limit=${this.state.numberLimit}`)
   .then(res => {
     this.props.boardNameSelect(res.body.data.children);
   })
   .catch(res => {
     this.setState({
       error: true,
       errorMsg: 'Please try again!',
     })
   })
 }

  render(){
    return (
      <div>
        {this.state.errorMsg ? <div className='error'>{this.state.errorMsg}</div> : ''}
      <form onSubmit={this.handleSubmit} className={!this.state.error ? 'input-fields' : 'error'}>
        <input
          type='text'
          name='redditBoard'
          placeholder='Article Names'
          value={this.state.boardName}
          onChange={this.handleBoardNameChange}
        />
        <input
          type='text'
          name='limit'
          placeholder='Article Quantity'
          value={this.state.numberLimit}
          onChange={this.handleLimit}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    </div>
    )
  }

}

class SearchResultList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>Search Results</h1>
        <ul>
             {this.props.topic.map((item, i) => {
               return (
                 <li key={i}>
                   <a href={item.data.url}>{item.data.title}</a>
                 </li>
               )
             })}
           </ul>
      </div>
    )
  }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      boardNameSelected: null,
      topic: [],
    }
    this.boardNameSelect = this.boardNameSelect.bind(this)
  }

  boardNameSelect(result){
      this.setState({
         topic: result,
       })
  }



  render(){
    return(
      <div>
        <div className='search'>
        <h1>Welcome!</h1>
        <SearchForm boardNameSelect={this.boardNameSelect}/>
        </div>
        <div className='result-box'>
        <SearchResultList topic={this.state.topic}/>
        </div>
      </div>
    )
  }
}


const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
