import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import authImage from '../../../static/assets/images/auth/16.png';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorText: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ''
        });
    }

    handleSubmit(event) {
        axios
            .post(
                'http://localhost:5005/login', {
                    email: this.state.email,
                    password: this.state.password
                }, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    this.props.handleSuccessfulAuth();
                }   else {
                    this.setState({
                        errorText: 'wrong email or password'
                    });
                    this.props.handleUnsuccessfulAuth();
                }
            })
            .catch(error => {
                this.setState({
                    errorText: 'an error ocurred'
                });
                this.props.handleUnsuccessfulAuth();
                
            });


        event.preventDefault();
    }


    render() {
        return (

            <div className='auth-wrapper'>

                <div 
                    className='image-space-left'
                    style={{
                        background: 'url(' + authImage + ') no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}  
                />

                <div className='content-wrapper'>

                    <div className='site-name'>Gossip Girl room</div>

                    <div className='handle-error'> {this.state.errorText} </div>

                    <form onSubmit={this.handleSubmit} className='auth-form-wrapper'>

                        <div className='form'>
                            <FontAwesomeIcon icon='envelope' />

                            <input

                                type='email'
                                name='email'
                                placeholder='email'
                                value={this.state.email}
                                onChange={this.handleChange}

                            />

                        </div>

                        <div className='form'>
                            <FontAwesomeIcon icon='key' />

                            <input
                                type='password'
                                name='password'
                                placeholder='password'
                                value={this.state.password}
                                onChange={this.handleChange}

                            />

                        </div>

                        <button type='submit' className='btn'>Come In</button>


                    </form>
                
                </div>

                <div 
                    className='image-space-right'
                    style={{
                        background: 'url(' + authImage + ') no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}  
                />

            </div>

        );
    }

}


