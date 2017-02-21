import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { getStoreDetail, saveStore, showCreateStoreForm } from './storeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { browserHistory } from 'react-router';
import WeeklySchedule from '../components/WeeklySchedule';
import BaseForm from '../components/BaseForm';
const FormItem = Form.Item;

class StoreForm extends Component {
    constructor(props) {
        super(props);
        this.state = this.createEmptyStore();

        this.editMode = (this.props.params.id !== 'new');
        if (this.editMode) {
            this.props.getStoreDetail(this.props.params.id);
        } else {
            this.props.showCreateStoreForm();
        }
    }

    createEmptyStore() {
        return {
            id: null,
            name: '',
            schedule: [],
        };
    }

    componentWillReceiveProps(props) {
        if (props.store && props.store.id && this.editMode && (this.state.id === null || props.store.id !== this.state.id)) {
            this.setState(pick(props.store, ['id', 'name', 'schedule']));
            this.props.form.setFieldsValue(pick(props.store, ['name']));
        }
    }

    saveModification() {
        const store = {
            name: this.state.name,
            schedule: this.state.schedule,
        };
        if (this.state.id) {
            store.id = this.state.id;
        }
        this.props.saveStore(store);
    }

    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    onInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.saveModification();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.saveModification();
            }
        });
    }

    onChangeSchedule(schedule) {
      this.setState({ schedule });
    }

    handleChange(key, e) {
        this.setState({ [key]: e.target.value });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const nameError = isFieldTouched('name') && getFieldError('name');
        const title = this.editMode ? 'Edit Store' : 'Create a new Store';

        return (
            <BaseForm title={title} onSaveClick={this.handleSubmit.bind(this)} onCancelClick={browserHistory.goBack}>
                <FormItem label='Name' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} validateStatus={nameError ? 'error' : ''} help={nameError || ''} >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input the name of the fitting room.' }],
                        value: this.state.name,
                    })(
                        <Input type='text' id='name'
                               onChange={this.handleChange.bind(this, 'name')}
                               onKeyPress={this.onInputKeyPress.bind(this)}
                        />,
                    )}
                </FormItem>

                <FormItem label='Schedule' labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <WeeklySchedule
                        schedule={this.state.schedule}
                        onChange={this.onChangeSchedule.bind(this)} />
                </FormItem>
            </BaseForm>
        );
    }
}

function mapStateToProps(state) {
    return {
        store: state.storeReducer.store,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getStoreDetail, saveStore, showCreateStoreForm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(StoreForm));
