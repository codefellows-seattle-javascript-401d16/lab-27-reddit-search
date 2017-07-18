import React from 'react';

const MAX_RESULTS = 100;

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      numResults: 10,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleFormSubmit() {
    this.props.onSubmit({
      subreddit: this.state.searchText,
      numResults: this.state.numResults,
    });
  }

  handleInputChange(evt) {
    this.setState({
      searchText: evt.target.value,
    });
  }

  handleNumberChange(evt) {
    let newValue = evt.target.value;
    if(newValue > MAX_RESULTS)
      newValue = MAX_RESULTS;
    if(newValue < 1)
      newValue = 1;
    this.setState({
      numResults: newValue,
    })
  }

  render() {
    return (
      <div className='search-form'>
        <div>
          <label
            htmlFor='subreddit'
          >
            Subreddit:
          </label>
          <input
            type='text'
            name='subreddit'
            onChange={this.handleInputChange}
            value={this.state.searchText}
            placeholder='subreddit name'
            className={this.props.invalid ? 'invalid' : ''}
          />
        </div>
        <div>
          <label
            htmlFor='limit'
          >
            Number of topics:
          </label>
          <input
            type='number'
            name='limit'
            onChange={this.handleNumberChange}
            value={this.state.numResults}
          />
        </div>
        <button
          onClick={this.handleFormSubmit}
        >Submit</button>
      </div>
    );
  }
}
