import React from 'react';
import Image from '../../assets/images/app-images/logo.png';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zones: [],
            currentZone: []
        };
    }
    render() {
        return (
            <div className="header-container">
                <div className="app-logo">
                    <img src={Image} className="logo-image"/>
                </div>
                <div className="app-title">Hilton</div>
                <div id="userDetailInfo" className="user-info"></div>
                <div className="clear"></div>
            </div>
        );
    }
}
