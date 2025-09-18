import React, { Component } from 'react';
import axios from 'axios';

import NewspaperItem from './newspaper-item';

export default class NewspaperContainer extends Component {

    constructor() {
        super();

        this.state = {
            pageTitle: 'are you here for the gossip?',
            isLoading: false,
            data: []
        };

        this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

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

    handlePageTitleUpdate() {
        this.setState({
            pageTitle: 'may your wishes come true'
        });
    }

    render() {

        if (this.state.isLoading) {
            return <div>Loading...</div>;
        }

        return (

            <div className='newspaper-wrapper'>

                <div className='filter-links'>
                    <button className='btn' onClick={() => this.handleFilter('Teachers')}>Teachers</button>
                    <button className='btn' onClick={() => this.handleFilter('Classmates')}>Classmates</button>
                    <button className='btn' onClick={() => this.handleFilter('Parents')}>Parents</button>
                    <button className='btn' onClick={() => this.handleFilter('Everyone')}>Everyone</button>
                </div>

                <div className='newspaper-items-wrapper'>
                    {this.newspaperItems()}
                </div>
                
            </div>

           

        );
    }
}