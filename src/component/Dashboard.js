import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';
import { getUserToken, removeUserToken } from './storage';
import { setSiteId, getSiteId } from './storage';
import { setTankId, getTankId } from './storage';


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            isSignedOut: false
        };
    };

    viewSitesList = () => {  
        const authToken = getUserToken('authToken');
        console.log('token: ', authToken);

        window.open(`https://fcs.concept-nova.com/api/v1/sites/?token=${authToken}`);

        fetch(`https://fcs.concept-nova.com/api/v1/sites/?token=${authToken}`)
        .then(response => response.json())
        .then(response => { 
            console.log(response);

        // capture site_id
        setSiteId(response.message[0].site_id);
        })
        .catch(err => { 
            console.log(err) 
        });
    };

    viewTanksList = () => {
        const authToken = getUserToken('authToken');
        const siteID = getSiteId('siteID');
        console.log('site_id: ', siteID);

        window.open(`https://fcs.concept-nova.com/api/v1/sites/${siteID}?token=${authToken}`);

        fetch(`https://fcs.concept-nova.com/api/v1/sites/${siteID}?token=${authToken}`) 
        .then(response => response.json())
        .then(response => { 
            console.log(response);
            
        // capture tank_id
        setTankId(response.message[0].tank_id); 
        })
        .catch(err => { 
            console.log(err) 
        }); 
    };

    viewTankDetails = () => {
        const authToken = getUserToken('authToken');
        const siteID = getSiteId('siteID');
        const tankID = getTankId('tankID');
        console.log('tank_id: ', tankID);

        window.open(`https://fcs.concept-nova.com/api/v1/sites/${siteID}/${tankID}?token=${authToken}`);

        fetch(`https://fcs.concept-nova.com/api/v1/sites/${siteID}/${tankID}?token=${authToken}`) 
        .then(response => response.json())
        .then(response => { 
            console.log(response);
        })
        .catch(err => { 
            console.log(err) 
        }); 
    };

    signOut = () => {
        //unassign token from authenticated user
        removeUserToken('authToken');
        this.setState({isSignedOut: true});
    };

    render() {
      if(this.state.isSignedOut) {
        return <Redirect to='/' />
        }
        return(
            <div id='nav-container'>
               <h3>Welcome to Concept Nova's FCS - Fuel Control System </h3>
                <ul id='navigation'>
                    <li className='nav-item' onClick={this.viewSitesList}>View Sites</li>&nbsp;
                    <li className='nav-item' onClick={this.viewTanksList}>View Tanks</li>
                    <li className='nav-item' onClick={this.viewTankDetails}>Tank Details</li>
                </ul>   
                    <button className='sign' id='sign-out' onClick={this.signOut}>Sign Out</button>
                    </div>
            )
        }
    }
    
    export default Dashboard;
                