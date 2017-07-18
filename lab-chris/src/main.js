import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://pokeapi.co/api/v2'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pokeName: '',
      pokemonLookup: {},
      pokemonSelected: null,
      pokemonNameError: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.pokemonSelect = this.pokemonSelect.bind(this)
    this.handlePokeNameChange = this.handlePokeNameChange.bind(this)
  }

  handlePokeNameChange(e){
    this.setState({pokeName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.pokemonSelect(this.state.pokeName)
  }

  componentDidUpdate(){
    console.log('___STATE___', this.state)
    console.log('___props___', this.props)
  }

  componentDidMount(){
    console.log('hello wrold')
    if(localStorage.pokemonLookup){
      try {
        let pokemonLookup = JSON.parse(localStorage.pokemonLookup)
        this.setState({pokemonLookup})
      } catch(err) {
        console.log(err)
      }
    } else {
      superagent.get(`${API_URL}/pokemon/`)
      .then(res => {

        let pokemonLookup = res.body.results.reduce((lookup, n) => {
          lookup[n.name] = n.url;
          return lookup
        }, {})

        try {
          localStorage.pokemonLookup = JSON.stringify(pokemonLookup)
          this.setState({pokemonLookup})
        } catch (err) {
          console.error(err)
        }
      })
      .catch(console.error)
    }

  }

  pokemonSelect(name){
    if(!this.state.pokemonLookup[name]){
      this.setState({
        pokemonSelected: null,
        pokemonNameError: name,
      })
    } else {
      superagent.get(this.state.pokemonLookup[name])
      .then(res => {
        console.log('selected pokemon', res.body)
        this.setState({
          pokemonSelected: res.body,
          pokemonNameError: null,
        })
      })
      .catch(console.error)
    }

  }

  render(){
    return (
      <div>
        <h1> form demo </h1>

        <form onSubmit={this.handleSubmit} >
          <input
            type='text'
            name='pokemonName'
            placeholder='poke name'
            value={this.state.pokeName}
            onChange={this.handlePokeNameChange}
            />
        </form>

        { this.state.pokemonNameError ?
          <div>
            <h2> pokemon {this.state.pokemonNameError} does not exist </h2>
            <p> make another request ! </p>
          </div> :
          <div>
          { this.state.pokemonSelected ?
            <div>
              <h2> selected {this.state.pokemonSelected.name} </h2>
              <p> booyea </p>
              <h3> abilities </h3>
              <ul>
                {this.state.pokemonSelected.abilities.map((item, i) => {
                  return (
                    <li key={i}>
                      <p> {item.ability.name} </p>
                    </li>
                  )
                })}
              </ul>
            </div> :
            <div>
              <p> make a request </p>
            </div>
          }
          </div>
        }
      </div>
    )
  }
}

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
