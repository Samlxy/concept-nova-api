import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Form from '../../App';
import './Dashboard.css';
import { getUserToken, removeUserToken } from '../storage';


class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedOut: false
        };
    };

    viewSitesList = () => {  
        const authToken = getUserToken('authToken');
        console.log('token: ', authToken);
        window.open(`https://fcs.concept-nova.com/api/v1/sites/?token=${authToken}`);
    };

    viewTanksList = () => {
        const authToken = getUserToken('authToken');
        window.open(`https://fcs.concept-nova.com/api/v1/sites/2?token=${authToken}`);
    };

    viewTankDetails = () => {
        const authToken = getUserToken('authToken');
        window.open(`https://fcs.concept-nova.com/api/v1/sites/2/168092057?token=${authToken}`);
    };

    signOut = () => {
     // unassign token from authenticated user
        removeUserToken('authToken');
        this.setState({isSignedOut: true});
    };

    render() {
      if(this.state.isSignedOut) {
        return (
            <div>
                <Redirect to='/' />
                <Route component={Form} /> 
                <div id='logout-notice'>You are Signed Out!</div>
            </div>
        )};
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
        );
    };
};
    
    export default Dashboard;
                