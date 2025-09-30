import React from 'react';
import mailboxPicture from '../../../static/assets/images/mailbox/50.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function() {
    return (
        <div className='content-wrapper'>

            <div 
                className='left-column'
                style={{
                    background: 'url(' + mailboxPicture + ') no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    
                }}
                

            />


            <div className='right-column'>

                <div className='text-title'>Dear sinner, </div>
                
                <div className='text'>

                    <p>Welcome to the secret repository... Obviously, an inclusive secret repository, so nobody should be left behind: your friend, your enemy, your partner, your teacher... not even your mom.</p>
                    <p>If you have witnessed one of their little -hopefully, not so little- secrets, burn their mask, gather the evidence, and share it with the world; my mailbox will be thirsty, oh, so thirsty, for your tea...</p>
                    
                    <p>Or maybe... maybe you have something to confess? There is no judgement between my lines, so please, let me be your confessor, your bridge to freedom...</p>

                    <p>Oh, yes, only one little note: even hell and open relationships have a few rules, G.G. just one: no revenge porn or outing will be accepted.</p>

                </div>

                <div className='contact-info'>

                    <div className='icon'><FontAwesomeIcon icon='envelope' /></div>
                    <div className='text'>info@gossipgirl.com</div>

                </div>

                <div className='text-pd'>
                    PD. I can assure you your identity will remain secret till the day I die...
                </div>

                <div className='logo'>

                    <div className='logo-part-one'>xoxo,</div>

                    <div className='logo-part-two'>Gossip Girl</div>

                </div>

                
                

            </div>

        </div>
    );
}