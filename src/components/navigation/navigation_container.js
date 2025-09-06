import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';


const NavigationComponent = () => {

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

                <div className='navigation-link'>
                    
                    <NavLink to='/anonymous-mailbox' activeClassName='nav-link-active'>anonymous mailbox</NavLink>
        
                </div>

            </div>

            
    
       
        </div>
    )


}

export default withRouter(NavigationComponent);