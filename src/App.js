import React, { Component } from 'react';
import conceptNova from './component/concept-nova-logo.jpg';  
import './App.css';
import { getUserToken, setUserToken } from './component/storage';
import { Redirect } from 'react-router-dom';


class Form extends Component {
    constructor(props) {
        super()
        this.state = { 
            isSignedIn: false,
            logInParams: {
                email: '', 
                password: ''
            }
        }; 
    };

    captureEmail = (event) => this.setState({email: event.target.value});
    capturePassword = (event) => this.setState({password: event.target.value});

    signInAuthentication = (event) => {
        event.preventDefault();
        let authEmail = this.state.email;
        let authPassword = this.state.password;
        
        console.log('email: ', authEmail, ' ', 'password:',authPassword);

        fetch('https://fcs.concept-nova.com/api/v1/login', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: authEmail,
                password: authPassword
            })
        })
        .then(response => response.json())
        .then(response => { 
            console.log(response);
     // capture generated token
        setUserToken(response.message.token);
        })
        .catch(err => { 
            console.log(err);
        });      
        
        if (authEmail === 'api@concept-nova.com' && authPassword === 'Concept@Nova.API') { 
         // assign token to authenticated user 
            setUserToken('authToken')
            this.setState({isSignedIn: true});
        } else {
            document.getElementById('log-error').innerHTML = 'Invalid Email or Password';
        }
    }         

    render () { 
        if(getUserToken('authToken')) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div id='form'>
                <img src={conceptNova} alt='concept-nova-logo'/>
                <h2>Sign In</h2>
                <div id='log-error'></div>
                <form onSubmit={this.signInAuthentication}>
                    <input className='input-style' id='email-field' type='email' size='32' placeholder='Email address *' onChange={this.captureEmail} /><p></p>
                    <input className='input-style' id='password-field' type='password' size='32' placeholder='Password *' onChange={this.capturePassword} />
                    <input id='sign-in' type='submit' value='Sign In'></input>
                </form>
            </div>
        );
    };
};

export default Form;
