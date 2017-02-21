import React, { Component } from 'react';
import { Row, Col, Button, Icon, DatePicker, TimePicker, notification } from 'antd';
import { range, omit } from 'lodash';
import moment from 'moment';

function disabledMinutes(h) {
  return range(0, 60).filter(i => i % 15 !== 0);
}

class DayByDaySchedule extends Component {
    constructor(props) {
        super();
        this.state = {
            schedule: props.schedule || []
        };
    }

    componentWillReceiveProps(props) {
        if (props.schedule) {
            this.setState({ schedule: props.schedule });
            this.forceUpdate();
        }
    }

    onDateChange(index, date, dateFormatted) {
        if (date) {
            if (this.state.schedule.filter(e => e.date === dateFormatted).length) {
                notification.warning({
                    message: 'Warning',
                    description: 'A schedule already exists for this day.',
                });
                this.state.schedule[index].date = null;
            } else {
                this.state.schedule[index].date = dateFormatted;    
            }
        } else {
            this.state.schedule[index].date = null;
        }
        
        this.onChange();
    }

    onTimeChange(index, type, time) {
        this.state.schedule[index][type] = time ? time.format('HH:mm') : null;
        this.onChange();
    }

    addEntry() {
        const today = moment().format('YYYY-MM-DD');
        this.state.schedule.push({
            date: null,
            from: '09:00',
            to: '17:00'
        });
        this.onChange();
        this.forceUpdate();
    }

    deleteEntry(index) {
        this.state.schedule.splice(index, 1);
        this.onChange();
        this.forceUpdate();
    }

    addUnavailability(index) {
        if (this.state.schedule[index].unavailability === undefined) {
            this.state.schedule[index].unavailability = [];
        }
        this.state.schedule[index].unavailability.push({
            from: null,
            to: null
        });
        this.onChange();
        this.forceUpdate();
    }

    deleteUnavailability(index, unavIndex) {
        this.state.schedule[index].unavailability.splice(unavIndex, 1);
        this.onChange();
        this.forceUpdate();
    }

    onUnavailabilityTimeChange(index, unavIndex, type, time) {
        this.state.schedule[index].unavailability[unavIndex][type] = time.format('HH:mm');
        this.onChange();
    }

    onChange() {
        const schedule = this.state.schedule
            .filter(p => p.date && p.from && p.to)
            .map(p => omit(p, ['_id']));

        for (let i = 0; i < schedule.length; i++) {
            if (schedule[i].unavailability) {
                schedule[i].unavailability = schedule[i].unavailability
                                            .filter(p => p.from && p.to)
                                            .map(p => omit(p, ['_id']));
            }
        }
        this.props.onChange(schedule);
    }

    renderUnavailability(unav, index, unavIndex) {
        return (
            <Row key={'unav-'+index+'-'+unavIndex}>
                <Col offset={1} xs={3} md={3}>
                    <Button type="danger" className="ant-btn-md" onClick={this.deleteUnavailability.bind(this, index, unavIndex)}>
                        <Icon type="delete" /> Delete break
                    </Button>
                </Col>
                <Col offset={2} xs={3} md={2} className={'timelabel'}>From:</Col>
                <Col xs={4} md={3}>
                    <TimePicker
                        placeholder="From"
                        size="large"
                        format="HH:mm"
                        defaultValue={unav.from ? moment(unav.from, 'HH:mm') : null}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'from')}
                        disabledMinutes={disabledMinutes}
                        hideDisabledOptions
                    />
                </Col>
                <Col xs={3} md={2} className={'timelabel'}>To:</Col>
                <Col xs={4} md={3}>
                    <TimePicker
                        placeholder="To"
                        size="large"
                        format="HH:mm"
                        defaultValue={unav.to ? moment(unav.to, 'HH:mm') : null}
                        onChange={this.onUnavailabilityTimeChange.bind(this, index, unavIndex, 'to')}
                        disabledMinutes={disabledMinutes}
                        hideDisabledOptions
                    />
                </Col>
            </Row>
        );
    }

    renderEntry(entry, index) {
        let breakIndex = 0;
        return (
            <div className={'dayschedule'} key={'schedule-'+index}>
                <Row>
                    <Col xs={3} md={2}>
                        <Button type="danger" className="ant-btn-md" onClick={this.deleteEntry.bind(this, index)}>
                            <Icon type="delete" /> Delete
                        </Button>
                    </Col>
                    <Col xs={5} md={4}>
                        <DatePicker
                            placeholder="Date"
                            size="large"
                            format="YYYY-MM-DD"
                            defaultValue={entry.date ? moment(entry.date, 'YYYY-MM-DD'): null}
                            onChange={this.onDateChange.bind(this, index)}
                            disabledMinutes={disabledMinutes}
                            hideDisabledOptions
                        />
                    </Col>
                    <Col xs={3} md={2} className={'timelabel'}>From: </Col>
                    <Col xs={4} md={3}>
                        <TimePicker
                            placeholder="From"
                            size="large"
                            format="HH:mm"
                            defaultValue={moment(entry.from, 'HH:mm')}
                            onChange={this.onTimeChange.bind(this, index, 'from')}
                            disabledMinutes={disabledMinutes}
                            hideDisabledOptions
                        />
                    </Col>
                    <Col xs={3} md={2} className={'timelabel'}>To: </Col>
                    <Col xs={4} md={3}>
                        <TimePicker
                            placeholder="To"
                            size="large"
                            format="HH:mm"
                            defaultValue={moment(entry.to, 'HH:mm')}
                            onChange={this.onTimeChange.bind(this, index, 'to')}
                            disabledMinutes={disabledMinutes}
                            hideDisabledOptions
                        />
                    </Col>
                </Row>
                <Row>
                    <Col offset={1} xs={3} md={3}>
                        <label>Breaks</label>
                    </Col>
                </Row>
                {entry.unavailability && (
                    entry.unavailability.map((unav) => this.renderUnavailability(unav, index, breakIndex++))
                )}
                <Row>
                    <Col offset={1} xs={23}>
                        <Button type="primary" className="ant-btn-md" onClick={this.addUnavailability.bind(this, index)}>
                            <Icon type="plus-circle-o" /> Add a break
                        </Button>
                    </Col>
                </Row>
                <Row>&nbsp;</Row>
            </div>
        );
    }

    render() {
        let index = 0;
        return (
            <div>
                {this.state && this.state.schedule && (
                    this.state.schedule.map((entry) => this.renderEntry(entry, index++))
                )}
                <Button type="primary" className="ant-btn-md" onClick={this.addEntry.bind(this)}>
                    <Icon type="plus-circle-o" /> Add schedule for a day
                </Button>
            </div>
        );
    }
}


 export default DayByDaySchedule;