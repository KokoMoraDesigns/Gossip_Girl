import React, { Component } from 'react';
import axios from 'axios';

export default class NewspaperForm extends Component {

    constructor(props) {

        super(props);

        this.state = {
            title: props.editingItem ? props.editingItem.title : '',
            content: props.editingItem ? props.editingItem.content : '',
            cover_image: null,
            category: props.editingItem ? props.editingItem.category : '',
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);


        

    }

    componentDidUpdate(prevProps) {
        if (prevProps.editingItem !== this.props.editingItem) {
            const item = this.props.editingItem;
            this.setState({
                title: item ? item.title : '',
                content: item ? item.content : '',
                cover_image: null,
                category: item ? item.category : ''
            });
        }
    }





    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleFileChange(event) {
        this.setState({ cover_image: event.target.files[0] });
    }


    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('category', this.state.category);
        formData.append('user_id', 1);
        
        if (this.state.cover_image) {
            formData.append('cover_image', this.state.cover_image);
        }

        const url = this.props.editingItem
            ? `http://localhost:5005/update_news/${this.props.editingItem.id}`
            : 'http://localhost:5005/add_news';

        const method = this.props.editingItem ? 'put' : 'post';

        axios({
            method,
            url,
            data: formData,
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then(() => {
            this.setState({ message: 'this gossip has been successfully spread' });
            this.props.onSuccess();
        })
        .catch(error => {
            console.log('newsForm error', error);
            this.setState({ message: 'there has been an error in the proccess of spreading this gossip'})
        })



    }

    

    render() {

        return (
            <div className='newspaper-form'>

                <div className='newspaper-form-title'>{this.props.editingItem ? 'Wanna update a rumour?' : 'Wanna create a rumour?'}</div>

                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>

                    <input
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <textarea
                        name='content'
                        placeholder='The gossip'
                        value={this.state.content}
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

                    <input
                        type='file'
                        name='cover_image'
                        onChange={this.handleFileChange}
                    />




                    <button type='submit'> {this.props.editingItem ? 'Ooops, I did it again' : 'May the chaos arise'}</button>
                </form>

                {this.state.message && <p>{this.state.message}</p>}

                

               
            
            </div>
        );
    }

}

