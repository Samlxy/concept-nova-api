import React, { Component } from 'react';
import conceptNova from './component/concept-nova-logo.jpg';  
import './App.css';
import { setUserToken, getUserToken } from './component/storage';
import { setSiteId, getSiteId } from './component/storage';
import { setTankId, getTankId } from './component/storage';


class Form extends Component {
    constructor(props) {
        super()
        this.state = { 
            email: '', 
            password: '',
        } 
        /*
     this.captureEmail = this.captureEmail.bind(this);
     this.capturePassword = this.capturePassword.bind(this);
     this.signInAuthentication  = this.signInAuthentication.bind(this);
     */
    }
    captureEmail = (event) => this.setState({email: event.target.value});
    
    capturePassword = (event) => this.setState({password: event.target.value});

    signInAuthentication = (event) => {
        let authEmail = this.state.email;
        let authPassword = this.state.password;
        event.preventDefault();
        console.log('email: ', authEmail, ' ', 'password:',authPassword)

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
                console.log(response)
                if(response.code === 200) {
                  alert('You are successfully logged in')
                } else {
                  alert('Invalid login credentials')
                }

            // capture generated token
            setUserToken(response.message.token)
            })
            .catch(err => { 
                console.log(err) 
            });

            
    }

    viewSitesList = () => {  
        const authToken = getUserToken('authToken')
        console.log('token: ', authToken)

        window.open(`https://fcs.concept-nova.com/api/v1/sites/?token=${authToken}`)

        fetch(`https://fcs.concept-nova.com/api/v1/sites/?token=${authToken}`) 
        .then(response => response.json())
        .then(response => { 
            console.log(response)

        // capture site_id
        setSiteId(response.message[0].site_id) 
        })
        .catch(err => { 
            console.log(err) 
        }) 
    } 

    viewTanksList = () => {
        const authToken = getUserToken('authToken')
        const siteID = getSiteId('siteID');
        console.log('site_id: ', siteID)

        window.open(`https://fcs.concept-nova.com/api/v1/sites/${siteID}?token=${authToken}`)

        fetch(`https://fcs.concept-nova.com/api/v1/sites/${siteID}?token=${authToken}`) 
        .then(response => response.json())
        .then(response => { 
            console.log(response)
            
        // capture tank_id
        setTankId(response.message[0].tank_id) 
        })
        .catch(err => { 
            console.log(err) 
        }) 
    }

    viewTankDetails = () => {
        const authToken = getUserToken('authToken')
        const siteID = getSiteId('siteID');
        const tankID = getTankId('tankID');
        console.log('tank_id: ', tankID);

        window.open(`https://fcs.concept-nova.com/api/v1/sites/${siteID}/${tankID}?token=${authToken}`);

        fetch(`https://fcs.concept-nova.com/api/v1/sites/${siteID}/${tankID}?token=${authToken}`) 
        .then(response => response.json())
        .then(response => { 
            console.log(response)
        })
        .catch(err => { 
            console.log(err) 
        }) 
    }

    render () {
        return (
            <div id='form'>
                <img src={conceptNova} alt='concept nova logo'/>
                <h2>Sign In</h2>
                <form>
                    <input className='input-style' id='email-field' type='email' size='32' placeholder='Email address*' onChange={this.captureEmail}/><p></p>
                    <input className='input-style' id='password-field' type='password' size='32' placeholder='Password *' onChange={this.capturePassword}/>
                </form>

                <button id='sign-in' onClick={this.signInAuthentication}>Sign In</button><br />
                <button className='list-sites-tanks' onClick={this.viewSitesList}>View Sites</button>&nbsp;
                <button className='list-sites-tanks' onClick={this.viewTanksList}>View Tanks</button>
                <button id='details' onClick={this.viewTankDetails}>Tank Details</button>
            </div>
        )
    }
}

export default Form;
