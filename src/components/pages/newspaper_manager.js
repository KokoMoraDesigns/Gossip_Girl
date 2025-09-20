import React, { Component } from 'react';
import axios from 'axios';

import NewspaperSidebar from '../newspaper/newspaper-sidebar';
import NewspaperForm from '../newspaper/newspaper-form';

export default class NewspaperManager extends Component {

    constructor(props) {

        super(props);

        this.state = {
            title: '',
            content: '',
            cover_image: '',
            category: '',
            images: '', 
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const newData = {
            title: this.state.title,
            content: this.state.content,
            cover_image: this.state.cover_image,
            category: this.state.category,
            images: this.state.images,
            user_id: 1
        };

        axios.post('http://localhost:5005/add_new', newData, { withCredentials: true })
        .then(response => {
            this.setState({
                message: 'la noticia ha sido creada con éxito',
                title: '',
                content: '',
                cover_image: '',
                category: '',
                images: ''
            });
        })
        .catch(error => {
            console.log('addNew error', error);
            this.setState({ message: 'error al crear esta noticia' });
        });
    }



    render() {

        return (
            <div className='newspaper-manager'>

                <form onSubmit={this.handleSubmit}>

                    <input
                        type='text'
                        name='title'
                        placeholder='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <textarea
                        name='content'
                        placeholder='the gossip'
                        value={this.state.content}
                        onChange={this.handleChange}
                    />

                    <input
                        type='text'
                        name='cover_image'
                        placeholder='cover image URL'
                        value={this.state.cover_image}
                        onChange={this.handleChange}
                    />

                    <input
                        type='text'
                        name='image'
                        placeholder='evidences URL'
                        value={this.state.images}
                        onChange={this.handleChange}
                    />

                    <select
                        name='category'
                        value={this.state.category}
                        onChange={this.handleChange}
                    >
                        <option value='Teachers'>Teacher</option>
                        <option value='Classmates'>Classmate</option>
                        <option value='Parent'>Parent</option>
                    </select>

                    <button type='submit'>Publish</button>
                </form>

                {this.state.message && <p>{this.state.message}</p>}

            </div>
        );
    }
}