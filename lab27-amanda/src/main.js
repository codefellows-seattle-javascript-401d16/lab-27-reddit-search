// import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'


class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchValue: '',
			// limit
		}
		this.handelSubmit = this.handelSubmit.bind(this)
		this.handelChange = this.handelChange.bind(this)
	}
	handelChange(e) {
		this.setState({
			searchValue: e.target.value
		})
	}
	handelSubmit(e) {
		e.preventDefault()
		console.log('handlesubmit');
		this.props.search(this.state.searchValue)
	}
	render() {
		return (
      <form onSubmit = {
				this.handelSubmit
			}>
      <input type = 'text'
			value = {
				this.state.searchValue
			}
			onChange = {
				this.handelChange
			}
      />
      </form>)
	}
}

class SearchResultList extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
      <div>
      <h1> List of top 10 topics </h1>
      <ul> {this.props.topiclookup.map((item, i) => {
				return (
          <li key = {i}>
          <a href = {
					item.data.url
				}>
        {item.data.title}
        </a>
        </li>
      )
			})
		}
    </ul>
    </div>)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			topiclookup: [],
			topicSelected: null,
			topicError: null,
		}
		this.search = this.search.bind(this)
	}

	search(topic, limit) {
		superagent.get(`https://www.reddit.com/r/${topic}.json?limit=10`).then(res => {
			console.log(res)
			this.setState({
				topiclookup: res.body.data.children
			})
			console.log(this.state.topiclookup[0].data.title)
		})
	}

	render() {
		return (
      <div>
      <h1> Pick a Reddit Topic, any topic </h1>
      <SearchForm search = {this.search}
			/>
      <div className="inputBox">
      <SearchResultList topiclookup = {
				this.state.topiclookup
			}
			/>
      </div>
      </div>
    )
	}
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render( < App / > , container)
