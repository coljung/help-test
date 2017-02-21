import React from 'react';
import {Button, Form} from 'antd';
import Board from '../components/Board';
import {Link} from 'react-router';
import NotificationManager from '../notifications/NotificationManager';

// styles
import '../styles/board';

class BaseForm extends React.Component {
    render() {
        let deleteButton = null;
        if (this.props.onDeleteClick) {
            deleteButton = (
                <Button onClick={this.props.onDeleteClick}
                        type="danger"
                        size="large"
                        style={{marginRight: 10}}>Delete</Button>
            );
        }

        return (
            <Board title={this.props.title}>
                <NotificationManager />
                <Form>
                    {this.props.children}

                    <Button onClick={this.props.onSaveClick}
                            type="primary"
                            size="large"
                            disabled={ this.props.hasErrors ? this.props.hasErrors() : null }
                            style={ { marginRight: 10 } }>Save</Button>

                    {deleteButton}

                    <Button onClick={this.props.onCancelClick}
                            size="large">Cancel</Button>

                </Form>
            </Board>
        );
    }
}

export default BaseForm;
