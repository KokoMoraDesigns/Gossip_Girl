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
            editingId: null,
            message: '',
            newsList: [],
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }


    componentDidMount() {
        this.loadNews();
    }


    loadNews() {
        this.setState({ loading: true });

        axios.get('http://localhost:5005/get_news', { withCredentials: true })
        .then(response => {
            this.setState({ 
                newsList: response.data.newspaper_items,
                loading:false 
            });

        })
        .catch(error => {
            console.log('loadNews error', error);
            this.setState({ loading: false });
        });
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('category', this.state.category);
        formData.append('user_id', 1);
        
        if (this.state.cover_image instanceof File) {
            formData.append('cover_image', this.state.cover_image);
        }

        if (this.state.editingId) {
            axios.put(`http://localhost:5005/update_news/${this.state.editingId}`, formData, {
                withCredentials: true, 
                headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                this.setState({
                    message: 'this gossip has been successfully updated',
                    editingId: null
                });
                this.loadNews();
            })
            .catch(error => {
                console.log('updateNews error', error);
                this.setState({ message: 'there has been an error in the proccess of updating this gossip'});
            });
        } else {

            axios.post('http://localhost:5005/add_new', formData, { 
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data'}
            })
            .then(() => {
                this.setState({
                    message: 'this gossip has been successfully created'
                });
                this.loadNews();
            })
            .catch(error => {
                console.log('addNew error', error);
                this.setState({ message: 'there has been an error in the proccess of spreading this gossip' });
            });

        }


    }

    handleEdit(news) {
        this.setState({
            editingId: news.id,
            title: news.title,
            content: news.content,
            cover_image: news.cover_image,
            images: news.images,
            category: news.category
        });
    }



    handleDelete(id) {
        if (!window.confirm('are you sure you want to remove this gossip?')) return;

        axios.delete(`http://localhost:5005/delete_news/${id}`, { withCredentials: true })
        .then(() => {
            this.setState({ message: 'this gossip has been successfully removed'});
            this.loadNews();
        })
        .catch(error => {
            console.log('deleteNews error', error);
            this.setState({ message: 'there has been an error in the proccess of removing this gossip' });
        });
    }



    render() {

        return (
            <div className='newspaper-manager'>

                <div className='newspaper-manager-action'>{this.state.editingId ? 'Wanna update a rumour?' : 'Wanna create a rumour?'}</div>

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

                    <input
                        type='file'
                        name='cover_image'
                        onChange={(e) => this.setState({ cover_image: e.target.files[0] })}
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

                    <button type='submit'> {this.state.editingId ? 'Ooops, I did it again' : 'May the chaos arise'}</button>
                </form>

                {this.state.message && <p>{this.state.message}</p>}

                <div className='published-news'>
                    {this.state.loading ? (
                        <div className='loading-container'>
                            <div className='spinner'></div>
                            <div className='text'>Loading gossips...</div>
                        </div>
                    
                    ) : (
                        Array.isArray(this.state.newsList) && this.state.newsList.length > 0 ? (
                            this.state.newsList.map(news => (

                                <div className='published-new' key={news.id}>
                                    <div className='title category'>
                                        {news.title}: {news.category} 
                                    </div>

                                    {news.cover_image && (
                                        <img
                                            src={`http://localhost:5005${news.cover_image}`}
                                            alt={news.title}
                                            className='cover-thumb'
                                        />
                                    )}

                                    <button className='btn' onClick={() => this.handleEdit(news)}> update gossip </button>
                                    <button className='btn' onClick={() => this.handleDelete(news.id)}> bye gossip </button>
                                </div>
                            ))
            

                        ) : (

                            <div className='text'>No gossips found</div>
                        )
                    )}

                </div>
            </div>
        );
    }
}