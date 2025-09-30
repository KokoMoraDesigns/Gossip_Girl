import React, { Component } from 'react';
import axios from 'axios';

import NewspaperItem from './newspaper-item';

export default class NewspaperContainer extends Component {

    constructor() {
        super();

        this.state = {
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this);
    }



    getNewspaperItems(category = null){

        const url = category
            ? `https://gossip-girl-backend.onrender.com/get_news/${category}`
            : `https://gossip-girl-backend.onrender.com/get_news`;

        axios.get(url, { withCredentials: true })
        .then(response => {
            this.setState({
                data: response.data.newspaper_items
                    
            });

        })
        .catch(error => {
            console.log('getNewspaperItems error', error);
        });
    }

    handleFilter(filter) {
        if (filter === 'CLEAR_FILTERS') {
            this.getNewspaperItems();
        
        } else {
            this.getNewspaperItems(filter);
        }
    }



    newspaperItems() {
        return this.state.data.map(item => {
            return (
                <NewspaperItem
                    key={item.id}
                    item={item}
                />
            );
        });
    }

    componentDidMount() {
        this.getNewspaperItems();
    }


    render() {

        return (

            <div className='newspaper-wrapper'>

                <div className='filter-links'>
                    <button className='btn' onClick={() => this.handleFilter('Teachers')}>Teachers</button>
                    <button className='btn' onClick={() => this.handleFilter('Classmates')}>Classmates</button>
                    <button className='btn' onClick={() => this.handleFilter('Parents')}>Parents</button>
                    <button className='btn' onClick={() => this.handleFilter('CLEAR_FILTERS')}>Everyone</button>
                </div>

                <div className='newspaper-items-wrapper'>
                    {this.newspaperItems()}
                </div>
                
            </div>

           

        );
    }
}