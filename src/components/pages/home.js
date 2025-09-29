import React from 'react';
import NewspaperImage from '../../../static/assets/images/home/newspaper_background_classic.jpg';

export default function() {
    return (
        <div className='home-wrapper'>

            <div 
                className='image-space-left' 
                style={{
                    background: 'url(' + NewspaperImage + ') no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left'
                }}
            />

            <div className='home-content'>

                <div className='quote'> 

                    <p>

                        Between the whispers of the city <br/>

                        and the screaming of the night <br/>

                        there is a song crying from a rooftop. <br/>

                    </p>

                    <p>

                        Nobody speaks in the darkness <br/>

                        and yet <br/>

                        everybody is deafened by the gloom <br/>


                    </p>

                    <p>
                        Nobody speaks in the darkness <br/>

                        and yet 
                    </p>

                    

                    

                    


                </div>

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