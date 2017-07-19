import React from 'react'
import ReactDom from 'react-dom'
import superagent from 'superagent'

const API_URL = 'http://pokeapi.co/api/v2'

// create a form container component every time you create a form
// a form container is a component that holds the state for a forms inputs
class PokemonForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokeName: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePokeNameChange = this.handlePokeNameChange.bind(this)
  }

  handlePokeNameChange(e){
    this.setState({pokeName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.pokemonSelect(this.state.pokeName)
  }

  render(){
    return (
      // ALL INPUTS SHHOULD HAVE THEIR VALUES BOUND TO A STATE
      // this is called controlled inputs
      // we create controlled inputs by binding "value" to a state property
      // and providing an onChange event handler to the input
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='pokemonName'
          placeholder='poke name'
          value={this.state.pokeName}
          onChange={this.handlePokeNameChange}
          />
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonLookup: {},
      pokemonSelected: null,
      pokemonNameError: null,
    }

    this.pokemonSelect = this.pokemonSelect.bind(this)
  }
  // called evertime the state is changed

  componentDidUpdate(){
    console.log('___STATE___', this.state)
  }

  // this will get called once right before the app componet
  // gets added to the dom
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
    console.log('cool beans')
    if(!this.state.pokemonLookup[name]){
      // do something on state that enables the
      // view to show an error that that pokemon does not exist
      this.setState({
        pokemonSelected: null,
        pokemonNameError: name,
      })
    } else {
      // make a request to the pokemon api and do something on
      // state to store the pokemons details to be desplayed to the user
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

        <PokemonForm pokemonSelect={this.pokemonSelect} />

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

// create a place to put the app
const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(<App />, container)
