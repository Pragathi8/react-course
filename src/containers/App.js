import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      {id: 'qwerty1', name: 'Max',age: 28},
      {id: 'qwerty2', name: 'Manu',age: 26},
      {id: 'qwerty3', name: 'Jhon',age: 28},
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  componentDidMount() {
    console.log("[App.js] Component did mount");
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  render() {
    console.log("[App.js] Render");
    let persons = null;

    if(this.state.showPersons) {
      persons = 
        <Persons 
          persons = {this.state.persons}
          clicked = {this.deletePersonHandler}
          changed = {this.nameChangeHandler} 
          isAuthenticated = {this.state.authenticated}
        />
    }

    return (
      // <WithClass classes={classes.App}>
      <React.Fragment>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>Remove cockpit</button>
        <AuthContext.Provider 
          value={
            {
              authenticated: this.state.authenticated, 
              login: this.loginHandler
            }
          }
        >
          {this.state.showCockpit ?
          <Cockpit 
            title = {this.props.appTitle}
            showPersons = {this.state.showPersons}
            personsLength = {this.state.persons.length}
            clicked = {this.togglePersonsHandler}
            /> : null}
          {persons}
        </AuthContext.Provider>
      </React.Fragment>
      // </WithClass>
    );
  }
}

export default withClass(App, classes.App);
