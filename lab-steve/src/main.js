import './style/main.scss';
import React from 'react'; //use JSX
import ReactDom from 'react-dom'; //render JSX
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: '',
      limit: 10,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoardChange = this.handleBoardChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }
  handleBoardChange(e) {
    this.setState({board: e.target.value});
  }
  handleLimitChange(e) {
    this.setState({limit: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.boardSelect(this.state.board);
    this.props.limitSelect(this.state.limit);

    superagent.get(`${API_URL}/${this.state.board}.json?limit=${this.state.limit - 1}`)
      .then(res => {
        console.log('res.body.data.children: ', res.body.data.children);
        this.setState({
          failed: false,
          posts: res.body.data.children,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ failed: true });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='boardName'
          placeholder='Reddit Board Name'
          value={this.state.board}
          onChange={this.handleBoardChange}
        />
        <input
          type='range'
          name='boardLimit'
          placeholder='number'
          value={this.state.limit}
          onChange={this.handleLimitChange}
        />
        <button> Search! </button>
      </form>
    );
  }
}

class App extends React.component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Reddit Search Form</h1>
        <SearchForm />
      </div>
    );
  }
}




ReactDom.render(<App />, document.getElementById('root'));
