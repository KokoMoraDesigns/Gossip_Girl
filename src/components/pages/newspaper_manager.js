import React, { Component } from "react";

import NewspaperForm from "../newspaper/newspaper-form";
import NewspaperArchive from "../newspaper/newspaper-archive";
import api from '../../helpers/api';

export default class NewspaperManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newsList: [],
            editingItem: null
        };

        this.loadNews = this.loadNews.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    componentDidMount() {
        this.loadNews();

        const {id} = this.props.match.params;
        if (id) {
            this.loadNewsItem(id);
        }
    }

    loadNews() {
        api.get('/get_news')
        .then(response => {
            this.setState({ newsList: response.data.newspaper_items })
        })
        .catch(error => {
            console.log('loadNews error', error);
        })
    }

    loadNewsItem(id) {
        api.get(`/get_news/${id}`)
            .then(response => {
                this.setState({ editingItem: response.data });
                window.scrollTo({ top:0, behavior:smooth });
            })
            .catch(error => {
                console.log('loadNewsItem error', error)
            });
    }

    handleEdit(item) {
        this.setState({ editingItem: item }, () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    handleSuccess() {
        this.setState({ editingItem: null });
        this.loadNews();
    }

    render() {
        return (
            <div className="newspaper-manager">

                <NewspaperForm
                    editingItem={this.state.editingItem}
                    onSuccess={this.handleSuccess}
                />

                <NewspaperArchive
                    newsList={this.state.newsList}
                    onEdit={this.handleEdit}
                    onDelete={this.loadNews}
                />

            </div>
        );
    }
}