import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

import api from '../../helpers/api';



const NavigationComponent = (props) => {

    const conditionalLink = (route, linkText) => {

        return (
            <div className='navigation-link'>

                <NavLink to={route} activeClassName='nav-link-active'>{linkText}</NavLink>

            </div>
        );
    };


    const handleSignOut = () => {
        api
            .post('/logout', {})
            .then(response => {

                if (response.status === 200) {
                    props.handleSuccessfulLogout();
                    props.history.push('/');
                }

                
            })
            .catch(error => {
                console.log('hay un error cerrando la sesión', error)
            });
    };

    return (

        <div className='navigation-wrapper'>
            

            <div className='navigation-box'>
    
                <div className='navigation-link'>
        
                    <NavLink exact to='/' activeClassName='nav-link-active'>home</NavLink>
        
                </div>
        
                <div className='navigation-link'>
                    
                    <NavLink to='/hi-bitches' activeClassName='nav-link-active'>missed me?</NavLink>
        
                </div>

                <div className='navigation-link'>
                    
                    <NavLink to='/newspaper' activeClassName='nav-link-active'>newspaper</NavLink>
        
                </div>

                {props.loggedInStatus === 'LOGGED_IN' ? (conditionalLink('/newspaper-manager', 'newspaper manager')) : null}

                <div className='navigation-link'>
                    
                    <NavLink to='/anonymous-mailbox' activeClassName='nav-link-active'>anonymous mailbox</NavLink>
        
                </div>

            </div>

            <div className='log-out'>

                {props.loggedInStatus === 'LOGGED_IN' ? (
                    <button onClick={handleSignOut} className='logout-btn'>

                    
                        <FontAwesomeIcon icon='moon' />

                        <div className='text'>may the queen rest</div>

    
                        
                    </button>
                ) : null}

            </div>

            
    
       
        </div>
    )


}

export default withRouter(NavigationComponent);