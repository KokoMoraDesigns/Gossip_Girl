import React, { Component } from 'react';
import axios from 'axios';



export default class NewspaperDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newspaperItem: {}
        };
    }



    componentDidMount(){
        this.getNewspaperItem();
    }

    getNewspaperItem() {

        const { news_id } = this.props.match.params;

        axios.get(`http://localhost:5005/get_news/${news_id}`, { withCredentials: true }
        )
        .then(response => {
            
            this.setState({
                newspaperItem: response.data
            });
            
        })
        .catch(error => {
            console.log('getNewspaperItem error', error);
        });
    }

    render() {
        const {
            title,
            created_at,
            updated_at,
            content

        } = this.state.newspaperItem;

        return (
            <div className='newspaper-detail-wrapper'>

                <div className='title'>{title}</div>

                <div className='dates'>
                    {updated_at
                        ? `created at ${created_at} & updated at ${updated_at}`
                        : `created at ${created_at}`
                    }
                </div>

                <div className='content'>{content}</div>
            </div>
        );
    }
}