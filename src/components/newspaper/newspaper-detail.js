import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import NewspaperDetailImage from '../../../static/assets/images/newspaper-detail/11.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
            this.props.history.push('/no-match');

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

                <div 
                    className='image-space-left' 
                    style={{
                        background: 'url(' + NewspaperDetailImage + ') no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                <div className='newspaper-detail-content'>


                    <div className='title'>{title}</div>

                    <div className='dates'>
                        {updated_at
                            ? `created at ${created_at} & updated at ${updated_at}`
                            : `created at ${created_at}`
                        }
                    </div>

                    <div className='content'>{content}</div>

                    <Link to='/newspaper'>
                        <FontAwesomeIcon icon='newspaper'/>
                    </Link>

                    

                    

                    <div className='logo'>

                        <div className='logo-part-one'>xoxo,</div>

                        <div className='logo-part-two'>Gossip Girl</div>

                    </div>
                </div>

                <div 
                    className='image-space-right' 
                    style={{
                        background: 'url(' + NewspaperDetailImage + ') no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            </div>
        );
    }
}