import React, { Component } from 'react';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearMessages } from './notificationActions';

export class NotificationManager extends Component {
    render() {
        if (this.props.message) {
            setTimeout(this.props.clearMessages, 5000);
            return (
                <Alert message={this.props.message.content} type={this.props.message.messageType} showIcon />
            );
        }
        return (<div></div>);
    }
}

NotificationManager.propTypes = {
    message: React.PropTypes.object,
};


function mapStateToProps(state) {
    return {
        message: state.message,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationManager);
