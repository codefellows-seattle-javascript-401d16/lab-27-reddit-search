import React from 'react'
import reactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http:https://www.reddit.com/r/bees.json'

class BeeForm extends React.Component {
  constructor(props){
    super(props){
      this.state = {
        beeTopic: '',
        }

        this.handelSubmit = this.handelSubmit.bind(this)
        this.handelBeeTopicChange = this.handelBeeTopicChange.bind(this)
        this.handelTextInput = this.handelInput.bind(this)
        this.handelNumberInput = this.handelNumberInput.bind(this)
      }
      handelSubmit(e){
        this.setState({beeTopic: e.target.value})
      }

      handelSubmit(e){
        e.preventDefault()
        this.props.beeSelect(this.state.beeTopic)
      }

      render(){
        return(
          <form onSubmit={this.handelSubmit}>
          <input
          type= 'text'
          topic= 'bee topic'
          value= {this.state.beeTopic}
          onSubmit= {this.handelBeeTopicChange}
          />
          </form>
        )
      }
    }
  }
