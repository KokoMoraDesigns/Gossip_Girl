import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Login from '../auth/login';


class Auth extends Component {

    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }
    

    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin();
        this.props.history.push('/');
    }

    handleUnsuccessfulAuth() {
        this.props.handleUnsuccessfulLogin();
    }



    render() {
        return (

            <Login 
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
            />
        );
    }
}
 

export default withRouter(Auth);