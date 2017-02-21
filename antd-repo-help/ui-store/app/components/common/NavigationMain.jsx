import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

export default class NavigationMain extends Component {
    constructor(props) {
        super(props);
        // @TODO: fix routes keys for active state
        this.state = { current: props.pathname };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({ current: e.key });
    }
    render() {
        return (
            <Menu
                onClick={this.handleClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.current]}
                >
                <Menu.Item key="/admin">
                    <Link to="/admin" activeClassName="active">
                        <Icon type="home" />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/appointments">
                    <Link to="/admin/appointments" activeClassName="active">
                        <Icon type="calendar" />
                        <span className="nav-text">Appointments</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/stylists">
                    <Link to="/admin/stylists">
                        <Icon type="team" />
                        <span className="nav-text">Stylists</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/fitting-rooms">
                    <Link to="/admin/fitting-rooms">
                        <Icon type="appstore-o" />
                        <span className="nav-text">Fitting Rooms</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/inventory">
                    <Link to="/admin/inventory">
                        <Icon type="switcher" />
                        <span className="nav-text">Inventory</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/stores">
                    <Link to="/admin/stores">
                        <Icon type="shopping-cart" />
                        <span className="nav-text">Stores</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
