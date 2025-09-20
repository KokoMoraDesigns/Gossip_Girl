import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";


export default class NewspaperForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: '',
            content: '',
            cover_image: '',
            category:'',
            images: ''

        }
    }

    // -------------


    handleFilter(filter) {
        if (filter === 'CLEAR_FILTERS') {
            this.getNewspaperItems();
        
        } else {
            this.getNewspaperItems(filter);
        }
    }

    getNewspaperItems(filter = null){
        axios.get('http://localhost:5005/get_news', { withCredentials: true })
        .then(response => {
            if (filter) {
                this.setState({
                    data: response.data.newspaper_items.filter(item => {
                        return item.category === filter;
                    })
                });
            } else {
                this.setState({
                    data: response.data.newspaper_items
                });

            }

        })
        .catch(error => {
            console.log('getNewspaperItems error', error);
        });
    }



    render() {

        return (

           <div>


           </div>

        );
    }
}

