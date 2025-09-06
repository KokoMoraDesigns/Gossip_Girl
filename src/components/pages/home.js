import React from 'react';
import NewspaperImage from '../../../static/assets/images/home/newspaper_background_classic.jpg';

export default function() {
    return (
        <div className='home-wrapper'>

            <div className='image-space-left' style={{
                background: 'url(' + NewspaperImage + ') no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'left'
            }}></div>

            <div className='home-content'>

                <div className='quote'>yadayada</div>

                <div className='logo'>

                    <div className='logo-part-one'>xoxo,</div>

                    <div className='logo-part-two'>Gossip Girl</div>

                </div>

                

            </div>

            <div className='image-space-right'style={{
                background: 'url(' + NewspaperImage + ') no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'right'
            }}></div>



            

        </div>

        
    );
}