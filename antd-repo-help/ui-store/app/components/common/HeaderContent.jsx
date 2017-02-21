import React, { Component } from 'react';
import Logo from './Logo';
import NavigationUser from './NavigationUser';

// styles
import '../../styles/headerContent';

export default class HeaderContent extends Component {
    render() {
        return (
            <div className="headerContent">
                <Logo /> <h1>Store Management</h1>
                <NavigationUser />
            </div>
        );
    }
}
