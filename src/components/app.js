import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';


import NavigationContainer from './navigation/navigation_container';
// import Portada from './pages/portada';
import Home from './pages/home';
import AboutGossipGirl from './pages/missed-me';
import Auth from './pages/auth';
import AnonymousMailbox from './pages/anonymous_mailbox';
import Newspaper from './pages/newspaper';
import NewspaperItem from './pages/newspaper_item';
import NewspaperManager from './pages/newspaper_manager';
import NewspaperDetail from './newspaper/newspaper-detail';
import NoMatch from './pages/no-match';
import Icons from '../helpers/icons';



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

        if (loggedIn && loggedInStatus === 'LOGGED_IN') {
          return loggedIn;
  
        } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
          });
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
        path='/newspaper-manager'
        component={NewspaperManager}
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

            <Switch>

              <Route exact path='/hi-bitches' component={Home} />

              <Route
                path='/auth'
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />

              <Route path='/missed-me' component={AboutGossipGirl} />

              <Route path='/anonymous-mailbox' component={AnonymousMailbox} />

              <Route
                exact path='/newspaper/:news_id'
                component={NewspaperDetail}
              />

              <Route 
                path='/newspaper'
                render={props => (
                  <Newspaper {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />



              {this.state.loggedInStatus === 'LOGGED_IN' ? this.authorizedPages() : null}




              <Route component={NoMatch} />


            </Switch>

          </div>
          

        </Router>

        

        
      </div>
    )
  }
}

