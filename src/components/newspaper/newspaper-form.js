import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class NewspaperForm extends Component {


    constructor(props) {

        super(props);

        this.state = {
            title: props.editingItem ? props.editingItem.title : '',
            content: props.editingItem ? props.editingItem.content : '',
            cover_image: null,
            news_images: [],
            category: props.editingItem ? props.editingItem.category : 'Teachers',
            message: '',
            existingCover: props.editingItem ? props.editingItem.cover_image : null,
            existingImages: props.editingItem ? props.editingItem.news_images || [] : [],
            coverName: 'No cover has been selected',
            imagesNames: 'No evidences has been selected'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleImagesChange = this.handleImagesChange.bind(this);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        

    }



    componentDidUpdate(prevProps) {
        if (prevProps.editingItem !== this.props.editingItem) {
            const item = this.props.editingItem;
            this.setState({
                title: item ? item.title : '',
                content: item ? item.content : '',
                cover_image: null,
                news_images: [],
                category: item ? item.category : 'Teachers',
                existingCover: item ? item.cover_image : null,
                existingImages: item ? item.news_images || [] : [],
                message: this.props.editingItem ? '' : this.state.message,
                coverName: 'No cover has been selected',
                imagesNames: 'No evidences has been selected'
            });
            window.scrollTo(0,0);
        }
    }




    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }


    handleFileChange(event) {
        const file = event.target.files[0];
        this.setState({ 
            cover_image: file,
            coverName: file ? file.name : 'No cover has been selected'
             
        });
    }


    handleImagesChange(event) {
        const files = Array.from(event.target.files);
        const names = files.length > 0
            ? files.map(f => f.name). join(', ')
            : 'No evidences has been selected';
        this.setState({ 
            news_images: files,
            imagesNames: names
        });
    }


    handleDeleteImage(url) {
        const { id } = this.props.editingItem;
        axios.delete(`https://gossip-girl-backend.onrender.com/delete_news_image/${id}`, {
            data: { image_url: url },
            withCredentials: true
        })
        .then(() => {
            this.setState(prevState => ({
                existingImages: prevState.existingImages.filter(img => img !== url)
            }));
        })
        .catch(error => console.log('handleDeleteImage error:', error));
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

        this.state.news_images.forEach(file => {
            formData.append('news_images', file);
        });

        const url = this.props.editingItem
            ? `https://gossip-girl-backend.onrender.com/update_news/${this.props.editingItem.id}`
            : 'https://gossip-girl-backend.onrender.com/add_news';

        const method = this.props.editingItem ? 'put' : 'post';

        axios({
            method,
            url,
            data: formData,
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        .then(() => {
            if (this.props.editingItem) {
                this.setState({
                    message: 'this gossip has been successfully updated',
                    cover_image: null,
                    news_images: [],
                    coverName: 'No cover has been selected',
                    imagesNames: 'No evidences has been selected'
                });
            } else {
                this.setState({ message: 'this gossip has been successfully spread',
                                title: '',
                                content: '',
                                category: 'Teachers',
                                cover_image: null,
                                news_images: [],
                                coverName: 'No cover has been selected',
                                imagesNames: 'No evidences has been selected',
                                existingCover: null, 
                                existingImages: []
                });
            }
            this.props.onSuccess();
        })
        .catch(error => {
            console.log('newsForm error', error);
            this.setState({ message: 'there has been an error in the proccess of spreading this gossip'})
        });



    }

    

    render() {


        return (
            <div className='newspaper-form'>

                <div className='newspaper-form-title'>{this.props.editingItem ? 'Wanna update a rumour?' : 'Wanna create a rumour?'}</div>

                <form onSubmit={this.handleSubmit} encType='multipart/form-data' className='newspaper-form-items'>

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
                        <option value='Parents'>Parent</option>
                    </select>

                    
                    {this.state.existingCover && (
                        <div className='cover-preview'>
                            <div className='preview-title'>Current cover:</div>
                            <img
                                src={`https://gossip-girl-backend.onrender.com${this.state.existingCover}`}
                                alt='cover'
                                className='cover-thumb'
                            />
                        </div>
                    )}



                    {this.state.existingImages.length > 0 && (
                        <div className='evidences'>
                            <div className='preview-title'>Current evidences:</div>
                            {this.state.existingImages.map((url, idx) => (
                                <div key={idx} className='evidence-item'>
                                    
                                    <img
                                        src={`https://gossip-girl-backend.onrender.com${url}`}
                                        alt={`extra-${idx}`}
                                        className='evidence-thumb'
                                    />
                                    <button type='button'
                                        className='btn-small'
                                        onClick={() => this.handleDeleteImage(url)}
                                        ><FontAwesomeIcon icon='xmark'/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className='select-image-wrapper'>

                        <div className='select-image'>

                            <input
                                type='file'
                                name='cover_image'
                                onChange={this.handleFileChange}
                                className='images-input-hidden'
                                id='cover-image'
                            />

                            <label for='cover-image' className='select-image-btn'>
                                {this.props.editingItem ? 'Change cover' : 'Add cover'}
                            </label>

                            <span className='cover-name'> {this.state.coverName || 'No cover has been selected'} </span>

                        </div>


                        <div className='select-image'>

                            <input
                                type='file'
                                name='news_images'
                                multiple
                                onChange={this.handleImagesChange}
                                className='images-input-hidden'
                                id='news-images'
                            />

                            <label for='news-images' className='select-image-btn'>
                                {this.props.editingItem ? 'Add new evidences' : 'Add evidences'}
                            </label>

                            <span className='image-name'> {this.state.imagesNames} </span>

                        </div>

                    </div>

                    


                    <button type='submit' className='btn'> {this.props.editingItem ? 'Ooops... I did it again' : 'May the chaos arise'}</button>
                </form>

                {this.state.message && <p>{this.state.message}</p>}

                

               
            
            </div>
        );
    }

}

