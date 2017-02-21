import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

import '../styles/notes';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = this.createState(props.content);
    }

    componentWillReceiveProps(props) {
        this.setState(this.createState(props.content));
    }

    createState(content = null) {
        if (!content || content.length === 0) {
            return { content: [{ text: '' }] };
        }

        return { content };
    }

    addNote() {
        const content = this.state.content;
        content.push({ text: '' });

        this.onStateChange(content);
    }

    removeNote(index, e) {
        const content = this.state.content;
        content.splice(index, 1);

        this.onStateChange(content);
    }

    onNoteChange(index, e) {
        const content = this.state.content;
        content[index].text = e.target.value;

        this.onStateChange(content);
    }

    onStateChange(content) {
        this.setState(this.createState(content));
        this.props.onChange(content);
    }

    renderNotes() {
        return this.state.content.map((note, index) => {
            return <div key={index} className="note-container">
                <Input
                    disabled={this.props.readOnly}
                    size="large"
                    addonAfter={this.renderDeleteButton(index)}
                    value={note.text}
                    onChange={this.onNoteChange.bind(this, index)} />
            </div>;
        });
    }

    renderDeleteButton(index) {
        if (!this.props.readOnly) {
            return <Button onClick={this.removeNote.bind(this, index)}><Icon type="delete"/></Button>;
        }
        return null;
    }

    renderAddButton() {
        if (!this.props.readOnly) {
            return <Button onClick={this.addNote.bind(this)}><Icon type="plus-circle-o" /> Add another</Button>;
        }
        return null;
    }

    render() {
        return (
            <FormItem label={this.props.label}>
                {this.renderNotes()}

                <div className="note-add-button-container">
                    {this.renderAddButton()}
                </div>

            </FormItem>
        );
    }
}

 export default Notes;
