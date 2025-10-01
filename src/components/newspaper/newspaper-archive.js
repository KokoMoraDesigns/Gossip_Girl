import React, { Component } from "react";
import api, { API_URL } from "../../helpers/api";

export default class NewspaperArchive extends Component {

    constructor(props) {
    
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

    }



    handleDelete(id) {
        if (!window.confirm('are you sure you want to remove this gossip?')) return;

        api.delete(`/delete_news/${id}`)
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
                            <div className="tags">
                                <div className="title"> {news.title}</div>
                                <div className="category"> ({news.category.toLowerCase()}) </div>
                            </div>

                            {news.cover_image && (
                                <img
                                    src={`${API_URL}${news.cover_image}`}
                                    alt={news.title}
                                    className='cover-thumb'
                                />
                            )}

                            <div className="btn-wrapper">

                                <button className='btn' onClick={() => this.props.onEdit(news)}> modify gossip </button>
                                <button className='btn' onClick={() => this.handleDelete(news.id)}> bye gossip </button>
                            </div>
                    
          
                        </div>
                    ))}

                </div>
            </div>
        );
    }
}