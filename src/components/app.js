import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence , motion } from 'framer-motion';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import NavigationContainer from './navigation/navigation_container';
// import Portada from './pages/portada';
import Home from './pages/home';
import AboutGossipGirl from './pages/missed-me';
import Auth from './pages/auth';
import AnonymousMailbox from './pages/anonymous_mailbox';
import Newspaper from './pages/newspaper';
import NewspaperManager from './pages/newspaper_manager';
import NewspaperDetail from './newspaper/newspaper-detail';
import NoMatch from './pages/no-match';
import Icons from '../helpers/icons';
import {
  fadeVariant,
  slideUpVariant,
  slideLeftVariant,
  zoomVariant
} from '../helpers/animations';
import PageTransition from './transition/page-transition';
import TransitionOverlay from './transition/transition-overlay';
import DiagonalOverlay from './transition/diagonal-overlay';



axios.defaults.withCredentials = true;


export default class App extends Component {

  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    });
  }

  checkLoginStatus() {

    return axios
      .get('http://localhost:5005/check_session', {
        withCredentials:true
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({ loggedInStatus: 'LOGGED_IN'});
  
        } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
          });
        } 
      })

      .catch(error => {
        console.log('checkLoginStatus error', error)
      })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route
        key='newspaper-manager'
        path='/newspaper-manager/:id?'
        render={(props) => (
          <NewspaperManager {...props} />
        )}
        //component={NewspaperManager}
      />
    ];
  }



  render() {

    return (

      <div className='app'>

        <Router>

          <div>
            <NavigationContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Route 
              render={({ location }) => (
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={location.pathname}
                    style={{ position: 'relative' }}
                  >
                    <TransitionOverlay />
                    <Switch location={location} key={location.pathname}>

                      <Route exact path='/'>
                        <PageTransition ><Home /></PageTransition>
                      </Route>

                      <Route path='/auth'>
                        <PageTransition >
                          <Auth
                            handleSuccessfulLogin={this.handleSuccessfulLogin}
                            handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                        />
                        </PageTransition>
                      </Route>

                      <Route path='/hi-bitches'>
                        <PageTransition variant={slideUpVariant}><AboutGossipGirl /></PageTransition>
                      </Route>      

                      <Route path='/anonymous-mailbox'>
                        <PageTransition variant={slideUpVariant}><AnonymousMailbox /></PageTransition>
                      </Route>

                      <Route 
                        exact 
                        path='/newspaper/:news_id'
                        render={props => (
                          <PageTransition variant={slideUpVariant}>
                            <NewspaperDetail {...props} />
                          </PageTransition>
                        )}
                      />
                          

                      <Route path='/newspaper'>
                        <PageTransition variant={slideUpVariant}>
                          <Newspaper loggedInStatus={this.state.loggedInStatus}/>
                        </PageTransition>
                      </Route>

                      <Route exact path='/no-match'>
                        <PageTransition><NoMatch /></PageTransition>
                      </Route>

                      {this.state.loggedInStatus === 'LOGGED_IN'
                        ? this.authorizedPages().map(page => (
                          <PageTransition key={page.key} variant={slideUpVariant} >{page}</PageTransition>
                        ))
                        : null} 

                        <Route path='*'>
                          <PageTransition ><NoMatch /></PageTransition>
                        </Route>    

                    </Switch>
                  </motion.div>
                </AnimatePresence>
              )}
            />

            

          </div>
          

        </Router>

        

        
      </div>
    );
  }
}

