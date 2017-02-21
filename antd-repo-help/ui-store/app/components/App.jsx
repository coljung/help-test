import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import HeaderContent from './common/HeaderContent';
import NavigationMain from './common/NavigationMain';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import enUS from 'antd/lib/locale-provider/en_US';
// import NotificationManager from '../notifications/NotificationManager';

import { Layout, Menu, Icon, Dropdown, LocaleProvider } from 'antd';
const { Content, Header, Sider } = Layout;

// styles
import '../styles/app';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
        };
    }
    toggle() {
        this.setState({ collapsed: !this.state.collapsed });
    }
    render() {
        return (
            <LocaleProvider locale={enUS}>
                <div className="store_layout">
                    <Header>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={ this.toggle.bind(this) } />
                        <HeaderContent />
                    </Header>
                    <Layout>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}>

                            <NavigationMain pathname={this.props.location.pathname} />
                        </Sider>
                        <Content>
                            <main style={{ flex: 1, overflowY: 'auto', padding: 30 }}>
                                <ReactCSSTransitionGroup
                                        component="div"
                                        transitionName="example"
                                        transitionEnterTimeout={500}
                                        transitionLeaveTimeout={500}>
                                            {React.cloneElement(this.props.children, {
                                                key: this.props.location.pathname,
                                            })}
                                    </ReactCSSTransitionGroup>
                            </main>
                        </Content>
                    </Layout>
                </div>
            </LocaleProvider>
        );
    }
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps)(App);
