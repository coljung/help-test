import React, { Component } from 'react';
import { Select, Form, Row, Col, Button } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

class StylistAndTimeSelector extends Component {
    constructor(props) {
        super();
        this.state = {
            stylist: null,
            stylists: props.stylists || [],
            availabilities: props.availabilities || {},
            selectedDay: props.selectedDay || null,
            selectedHour: props.selectedHour || null
        };
    }

    componentWillReceiveProps(props) {
        if (props.stylists) {
            this.setState({
                stylist: props.stylist,
                stylists: props.stylists || [],
                availabilities: props.availabilities || {},
                selectedDay: props.selectedDay || null,
                selectedHour: props.selectedHour || null
            });
            this.forceUpdate();
        }
    }

    onChangeStylist(stylist_id) {
        this.props.onChangeStylist(stylist_id);
    }

    onChangeDay(day) {
        this.setState({ selectedDay: day, selectedTime: null });
        this.props.onChangeTime(day, null);
    }

    onChangeTime(time) {
        this.setState({ selectedTime: time });
        this.props.onChangeTime(this.state.selectedDay, time);
    }

    render() {
        const days = Object.keys(this.state.availabilities);
        let selectedDay = this.state.selectedDay;

        return (
            <div>
                <FormItem label='Stylist'>
                    <Select defaultValue={this.state.stylist ? this.state.stylist.id : null} onChange={this.onChangeStylist.bind(this)}>
                        <Option key="any-stylist" value={''}>- Any stylist -</Option>
                        {this.state.stylists.map((s) => (
                            <Option key={`${s.id}`} value={`${s.id}`}>{s.first_name} {s.last_name}</Option>
                        ))}
                    </Select>
                </FormItem>
                <Row>
                {days.map((d) => {
                    const availCount = this.state.availabilities[d].filter((h) => h.available).length;
                    if (this.state.selectedDay === null && availCount > 0) {
                        this.state.selectedDay = d;
                    }
                    return (
                        <Col xs={3} key={'avail-'+d}>
                            <Button type={d === this.state.selectedDay ? 'primary' : 'seconday'} disabled={availCount === 0 ? true : false} onClick={this.onChangeDay.bind(this, d)}>
                                <p>{moment(d, 'YYYY-MM-DD').format('dddd Do')}</p>
                                <p>{availCount} availabilit{availCount > 1 ? 'ies' : 'y'}</p>
                            </Button>
                        </Col>
                    )
                })}
                </Row>
                {days.map((d) => (
                    <Row key={`${d}`} data-date={d} style={d === this.state.selectedDay ? {'display': 'block'} : {}}>
                    {this.state.availabilities[d].map((av) => {
                        return (
                            <Col key={`${d}${av.time}`} xs={4}>
                                <Button type={d === this.state.selectedDay && av.time === this.state.selectedTime ? 'primary' : 'seconday'} disabled={!av.available} onClick={this.onChangeTime.bind(this, av.time)}>
                                    {av.time}
                                </Button>
                            </Col>
                        );
                    })}
                    </Row>
                ))}
            </div>
        );
    }
}

export default StylistAndTimeSelector;
