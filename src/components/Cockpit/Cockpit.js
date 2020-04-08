import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);
    console.log(authContext.authenticated);

    useEffect(() => {
        console.log("[cockpit] useeffect...");
        toggleBtnRef.current.click();
        // setTimeout(() => alert('saved data to db!'), 1000);
        return () => {
            console.log("[cockpit] clean up work in useeffect...");
        }
    }, []);

    useEffect(() => {
        console.log("[cockpit] 2nd useeffect...");
        return () => {
            console.log("[cockpit] 2nd clean up work in useeffect...");
        }
    })

    const assignedClasses = [];
    let btnClass = [];
    if(props.showPersons) {
        btnClass = classes.Red;
    }

    if(props.personsLength <= 2) {
      assignedClasses.push(classes.red); //classes = ['red]
    }
    if(props.personsLength <= 1) {
      assignedClasses.push(classes.bold); //classed = ['red', 'bold']
    }

    return (
        <div className = {classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!!!</p>
            <button 
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}
            >Toggle persons</button>
            <button onClick={authContext.login}>Login</button>
        </div>
    );
}

export default React.memo(cockpit);