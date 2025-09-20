import React, { Component } from "react";
import axios from 'axios';

export default class NewspaperArchive extends Component {

    constructor(props) {
    
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

    }



    handleDelete(id) {
        if (!window.confirm('are you sure you want to remove this gossip?')) return;

        axios.delete(`http://localhost:5005/delete_news/${id}`, { withCredentials: true })
        .then(() => {
            this.props.onDelete();
        })
        .catch(error => {
            console.log('deleteNews error', error);
        });
    }



    render() {

        return (
            <div className='newspaper-archive'>

                <div className="newspaper-archive-title">Old news</div>

                <div className='published-news'>
                    {this.props.newsList.map(news => (
                        <div className="published-new" key={news.id}>
                            <div className="title category"> {news.title}: {news.category}</div>

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
                    ))}

                </div>
            </div>
        );
    }
}