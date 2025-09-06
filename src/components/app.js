import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


import NavigationContainer from './navigation/navigation_container';
// import Portada from './pages/portada';
import Home from './pages/home';
import AboutGossipGirl from './pages/about_Gossip_Girl';
import Auth from './pages/auth';
import AnonymousMailbox from './pages/anonymous_mailbox';
import Newspaper from './pages/newspaper';
import NewspaperItem from './pages/newspaper_item';
import NewspaperManager from './pages/newspaper_manager';
import NoMatch from './pages/no-match';
import Icons from '../helpers/icons';


export default class App extends Component {

  // Para instalar mis dos maravillosos menús: en app:
// document.getElementById('mostrar-menu-aux').addEventListener('click', function() {
      //document.getElementById('navegacion-secundaria').style.display = 'block';
  //});

  //document.getElementById('ocultar-menu-aux').addEventListener('click', function() {
    //document.getElementById('navegacion-secundaria').style.display = 'none';
  //});

  render() {

    return (

      <div className='container'>

        <Router>

          <div>
            <NavigationContainer />

            <Switch>

              

              <Route exact path='/hi-bitches' component={Home} />

              <Route path='/missed-me' component={AboutGossipGirl} />

              <Route path='/anonymous-mailbox' component={AnonymousMailbox} />

              <Route path='/newspaper' component={Newspaper} />

              <Route exact path='/newspaper/:slug' component={NewspaperItem} />

              <Route component={NoMatch} />


            </Switch>

          </div>
          

        </Router>

        

        
        
       

        
        
        
        


       
      </div>
    )
  }
}

