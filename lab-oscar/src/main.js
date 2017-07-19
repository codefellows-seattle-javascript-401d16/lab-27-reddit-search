import './styles/styles.scss';
import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      boardName: '',
      numberLimit: '',
      sample: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBoardNameChange = this.handleBoardNameChange.bind(this)
    this.handleLimit = this.handleLimit.bind(this)
  }



 handleBoardNameChange(e){
   this.setState({boardName: e.target.value})
 }
 handleLimit(e){
   this.setState({numberLimit: e.target.value})
 }
 handleSubmit(e){
   e.preventDefault()
   this.props.boardNameSelect(this.state.boardName, this.state.numberLimit);
 }

  render(){
    return (
      <form onSubmit={this.handleSubmit} className='input-fields'>
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

  boardNameSelect(name, limit){
    console.log('this', name, limit)
    superagent.get(`https://www.reddit.com/r/${name}.json?limit=${limit}`)
    .then(res => {
      // let topic = res.body.data.children;
      this.setState({
         topic: res.body.data.children,
       })
    })
  }



  render(){
    return(
      <div>
        <div className='search'>
        <h1>Welcome!</h1>
        <SearchForm boardNameSelect={this.boardNameSelect}/>
        </div>
        <SearchResultList topic={this.state.topic}/>
      </div>
    )
  }
}


const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
