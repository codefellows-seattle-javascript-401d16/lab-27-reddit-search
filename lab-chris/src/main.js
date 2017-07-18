import React from 'react'
import ReactDom from 'react-dom'

class PokemonForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokeName='',
    }
    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e){
    this.setState({pokeName: e.target.value})
  }

  render(){
    return(
      <form>
        <input
          type='text'
          placeholder='pokename'
          onChange=[this.handleChange]
          value={this.state.pokeName}
          />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
   super(props)

   this.state = {}
  }

  render(){
    return(
      <div>
        <h1>Do you work </h1>
        <PokemonForm />
      </div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('root'))
