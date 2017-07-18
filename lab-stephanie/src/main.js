import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFormBoard: '',
      searchFormLimit: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePokeNameChange = this.handlePokeNameChange.bind(this);
  }

  handlePokeNameChange(e) {
    this.setState({ searchFormBoard: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.pokemonSelect(this.state.searchFormBoard);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="pokemonName"
          placeholder="poke name"
          value={this.state.searchFormBoard}
          onChange={this.handlePokeNameChange}
        />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonLookup: {},
      pokemonSelected: null,
      pokemonNameError: null
    };

    this.pokemonSelect = this.pokemonSelect.bind(this);
  }

  componentDidUpdate() {
    console.log('___STATE___', this.state);
  }

  componentDidMount() {
    console.log('hello wrold');
    if (localStorage.pokemonLookup) {
      try {
        let pokemonLookup = JSON.parse(localStorage.pokemonLookup);
        this.setState({ pokemonLookup });
      } catch (err) {
        console.log(err);
      }
    } else {
      superagent
        .get(`${API_URL}/${searchFormBoard}.json?limit=${searchFormLimit}`)
        .then(res => {
          let pokemonLookup = res.body.results.reduce((lookup, n) => {
            lookup[n.name] = n.url;
            return lookup;
          }, {});

          try {
            localStorage.pokemonLookup = JSON.stringify(pokemonLookup);
            this.setState({ pokemonLookup });
          } catch (err) {
            console.error(err);
          }
        })
        .catch(console.error);
    }
  }

  pokemonSelect(name) {
    console.log('cool beans');
    if (!this.state.pokemonLookup[name]) {
      this.setState({
        pokemonSelected: null,
        pokemonNameError: name
      });
    } else {
      superagent
        .get(this.state.pokemonLookup[name])
        .then(res => {
          console.log('selected pokemon', res.body);
          this.setState({
            pokemonSelected: res.body,
            pokemonNameError: null
          });
        })
        .catch(console.error);
    }
  }

  render() {
    return (
      <div>
        <h1> form demo </h1>

        <SearchForm pokemonSelect={this.pokemonSelect} />

        {this.state.pokemonNameError
          ? <div>
              <h2>
                pokemon {this.state.pokemonNameError} does not exist
              </h2>
              <p> make another request ! </p>
            </div>
          : <div>
              {this.state.pokemonSelected
                ? <div>
                    <h2>
                      selected {this.state.pokemonSelected.name}
                    </h2>
                    <p> booyea </p>
                    <h3> abilities </h3>
                    <ul>
                      {this.state.pokemonSelected.abilities.map((item, i) => {
                        return (
                          <li key={i}>
                            <p>
                              {item.ability.name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                : <div>
                    <p> make a request </p>
                  </div>}
            </div>}
      </div>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
