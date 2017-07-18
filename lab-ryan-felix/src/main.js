import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import SearchForm from './search-form.js';
import SearchResults from './search-results.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      error: false,
    }

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch({ subreddit, numResults }) {
    fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${numResults}`)
      .then(response => response.json())
      .then(json => json.data.children)
      .then(rawTopics => rawTopics.map(rawTopic => rawTopic.data))
      .then(topics => this.setState({ topics, error: false, }))
      .catch(err => {
        console.log(err)
        this.setState({ topics: [], error: true, })
      });
    }

  render() {
    return (
      <div className='app'>
        <h1>subreddit top post search</h1>
        <SearchForm
          onSubmit={this.onSearch}
          invalid={this.state.error}
        />
        <SearchResults
          results={this.state.topics}
          showLoading={this.state.loading}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
