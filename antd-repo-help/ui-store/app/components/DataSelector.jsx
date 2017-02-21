import React, { Component } from 'react';
import { Select, Form } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class DataSelector extends Component {
    constructor(props) {
        super(props);
        this.state = this.createState(props);
    }

    componentWillReceiveProps(props) {
        this.setState(this.createState(props));
    }

    createState(props) {
        if (!props) {
            return { dataList: [], default: null };
        }
        return { dataList: props.dataList, default: props.default };
    }

    onChange(value) {
        this.props.onChange(value);
        this.setState({ default: value });
    }

    render() {
        const data = this.state.dataList;
        const valueField = (this.props.valueField || 'id');
        const descriptionField = (this.props.descriptionField || 'name');

        const list = data.map((one, index) => <Option key={index} value={`${one[valueField]}`}>{one[descriptionField]}</Option>);

        return (
            <FormItem label={this.props.label}>
                <Select value={this.state.default} onChange={this.onChange.bind(this)}>
                    {list}
                </Select>
            </FormItem>
        );
    }
}

export default DataSelector;
