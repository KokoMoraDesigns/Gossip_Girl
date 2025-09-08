import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';



const NavigationComponent = (props) => {

    const conditionalLink = (route, linkText) => {

        return (
            <div className='navigation-link'>

                <NavLink to={route} activeClassName='nav-link-active'>{linkText}</NavLink>

            </div>
        );
    };


    const handleSignOut = () => {
        axios
            .delete('https://api.devcamp.space/logout', { withCredentials: true })
            .then(response => {

                if (response.status === 200) {
                    props.history.push('/hi-bitches');
                    props.handleSuccessfulLogout();
                }

                return response.data;
            })
            .catch(error => {
                console.log('hay un error cerrando la sesicón', error)
            });
    };

    return (

        <div className='navigation-wrapper'>
            

            <div className='navigation-box'>
    
                <div className='navigation-link'>
        
                    <NavLink to='/hi-bitches' activeClassName='nav-link-active'>home</NavLink>
        
                </div>
        
                <div className='navigation-link'>
                    
                    <NavLink to='/missed-me' activeClassName='nav-link-active'>missed me?</NavLink>
        
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
                    <a onClick={handleSignOut}>
                        <FontAwesomeIcon icon='moon' />
                    </a>
                ) : null}

            </div>

            
    
       
        </div>
    )


}

export default withRouter(NavigationComponent);