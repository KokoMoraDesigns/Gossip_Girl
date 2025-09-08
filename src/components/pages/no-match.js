import React from 'react';
import { Link } from 'react-router-dom';

import sideImage from '../../../static/assets/images/no-match/17.jpg'



export default function() {
    return (
        <div className='no-match-wrapper'>

            <div 
                className='image-space-left' 
                style={{
                    background: 'url(' + sideImage + ') no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left'
                }}
            />

            <div className='home-content'>

                <div className='text'>I don't know what your intentions were, but they won't be satisfied here</div>

                <Link to='/hi-bitches'>
                    <button className='btn'>Please, go away</button>
                </Link>

                <div className='logo'>

                    <div className='logo-part-one'>xoxo,</div>

                    <div className='logo-part-two'>Gossip Girl</div>

                </div>

                

            </div>

            <div 
                className='image-space-right'
                style={{
                    background: 'url(' + sideImage + ') no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'right'
                }}
            />

            

            

        </div>
    );
}