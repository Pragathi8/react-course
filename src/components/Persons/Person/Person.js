import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log("[Person.js] rendering...");
        return (
            <Fragment>
                {this.context.authenticated ? <p>Authentiacted</p> : <p>Please login</p> }
                <p onClick={this.props.click}>I'm a {this.props.name} and I'm {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input 
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name}
                />
            </Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);