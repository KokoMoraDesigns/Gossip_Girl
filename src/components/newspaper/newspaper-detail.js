import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import NewspaperDetailImage from '../../../static/assets/images/newspaper-detail/11.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';




export default class NewspaperDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newspaperItem: {},
            isMobile: window.matchMedia('(max-width: 788px)').matches,
            loggedIn: false,
            notFound: false
        };
    }



    componentDidMount(){
        this.getNewspaperItem();
        this.checkSession();
        this.mediaQuery = window.matchMedia('(max-width: 788px)');
        this.mediaQuery.addListener(this.handleResize.bind(this))
    }

    componentWillUnmount() {
        this.mediaQuery.removeListener(this.handleResize.bind(this));
    }

    handleResize(e) {
        this.setState({ isMobile: e.matches });
    }

    checkSession() {
        axios.get('http://localhost:5005/check_session', { withCredentials: true})
        .then(response => {
            this.setState({ loggedIn: response.data.logged_in });
        })
        .catch(error => {
            console.log('checkSession error', error);
        });
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
            this.setState({ notFound: true });

        });
    }


    render() {

        if (this.state.notFound) {
            return <Redirect to ='/no-match' />;
        }
        
        const {
            title,
            created_at,
            updated_at,
            content,
            news_images,
            cover_image

        } = this.state.newspaperItem;

        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500, 
            slidesToShow:1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000
        }

        

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

                    {this.state.isMobile && cover_image && (
                        <div className='cover-image'>
                            <img src={`http://localhost:5005${cover_image}`} alt={title} />
                        </div>
                    )}

                    <div className='dates'>
                        {updated_at
                            ? `created at ${created_at} & updated at ${updated_at}`
                            : `created at ${created_at}`
                        }
                    </div>

                    <div className='content'>{content}</div>

                    {Array.isArray(news_images) && news_images.length > 0 && (
                        <div className='extra-images'>
                            <Slider {...sliderSettings}>
                                {news_images.map((url, idx) => (
                                    <div key={`slide-${idx}`} style={{ textAlign: 'center' }}>
                                        <img 
                                            src={`http://localhost:5005${url}`}
                                            alt={`extra-${idx}`}
                                            style={{
                                                maxHeight: '400px',
                                                maxWidth: '100%',
                                                margin: 'auto',
                                                display: 'block'

                                            }}
                                        />

                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}

                    <div className='icons'>
                        <Link to='/newspaper'>
                            <FontAwesomeIcon icon='newspaper'/>
                        </Link>

                        {this.state.loggedIn && (

                            <Link to={`/newspaper-manager/${this.state.newspaperItem.id}`}>
                                <FontAwesomeIcon icon='feather'/>
                            </Link>

                        )}

                        

                    </div>



                    

                    

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