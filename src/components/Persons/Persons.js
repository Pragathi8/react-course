import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log("[persons.js] getDerivedStateFromProps....");
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextstate) {
    //     console.log("[persons.js] shouldComponentUpdate....");
    //     if(
    //         nextProps.persons !== this.props.persons ||
    //         nextProps.clicked !== this.props.clicked ||
    //         nextProps.changed !== this.props.changed
    //         ){
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[persons.js] getSnapshotBeforeUpdate....");
        return {message: 'snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[persons.js] componentDidUpdate....");
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log("[persons.js] componentWillUnmount....");
    }

    render() {
        console.log("[Persons.js] rendering...");
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)} 
            />
        })
    }
}

export default Persons;