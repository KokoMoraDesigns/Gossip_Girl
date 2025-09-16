import React, { Component } from 'react';


export default class NewspaperItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newspaperItemClass: ''
        };
    }

    handleMouseEnter() {
        this.setState({ newspaperItemClass: 'image-blur'});
    }

    handleMouseLeave() {
        this.setState({ newspaperItemClass: ''});
    }

    render() {

        const { id, cover_image, title } = this.props.item;

        return (

            <Link to={`/newspaper/${id}`}>

                <div 
                    className='newspaper-item-wrapper'
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}

                >
                    
                    <div 
                        className={'newspaoer-image-background' + this.state.newspaperItemClass}
                        style={{
                            backgroundImage: 'url(' + cover_image + ')'
                        }}
                    />

                    <div className='image-text-wrapper'>
                        <div className='title'>
                            {title}
                        </div>
                    </div>


                </div>


            </Link>

           

        );
    }
}