import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const MainPageLink = () => {
    
    return (
        <div className='home-route'>

            <NavLink to='/hi-bitches' activeClassName='big-logo'>Gossip Girl</NavLink>

        </div>
    )
}

export default withRouter(MainPageLink);

// en app: // <Route exact path='/' component={Portada} />