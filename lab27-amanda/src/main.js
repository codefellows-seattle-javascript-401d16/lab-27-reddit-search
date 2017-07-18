// import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r'

class SearchForm extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        topic: '',
        }
        this.handelSubmit = this.handelSubmit.bind(this)

      }
      componentDidMount(){
        superagent.get(`{http://reddit.com/r/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}}`)
        .then(res => {
          let topicLookup = res.body.results.reduce((lookup, n) => {
            lookup[n.topic] = n.url;
            return lookup
          }, {})
          try {
            this.setState({topicLookup})
          } catch(err) {
            console.log(err);
          }
        })
        .catch(console)
      }
            handelSubmit(e){
              this.setState({topic: e.target.value})
            }

            handelSubmit(e){
              e.preventDefault()
              this.props.topicSelect(this.state.topic)
            }

      render(){
        return(
          <form onSubmit={this.handelSubmit}>
          <input
          topic= 'topic'
          value= {this.state.topic}
          onChange= {this.handelChange}
          />
          </form>
        )
      }
    }

  class App extends React.Component{
    constructor(props){
      super(props)
        this.state = {
          topiclookup: [],
          topicSelected: null,
          topicError: null,
        }
      }



    render(){
      return(
        <div>
        <h1> Hello </h1>
        </div>
      )
    }
  }
 // topicSelect(topic){
 //   console.log('topicSelect')
 //   if(!this.state.topicLookup[topic])
 //   this.setState({
 //     topicSelected:null,
 //     topicError:null,
 //   })
 // } else {
 //   superagent
 // }

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
