import React, { Component } from 'react';
import { Row, Col, Switch, TimePicker, Button, Icon, DatePicker } from 'antd';
import { pick, range, upperFirst } from 'lodash';
import moment from 'moment';

// styles
import '../styles/WeeklySchedule';

function disabledMinutes(h) {
  return range(0, 60).filter(i => i % 15 !== 0);
}

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

class WeeklySchedule extends Component {
    componentDidMount() {
        this.setState({
            unavailability: [],
        });
    }

    componentWillReceiveProps(props) {
        if (props.schedule) {
            this.state = pick(props.schedule, daysOfWeek);
            if (props.schedule.weekdays) {
                this.state.monday = props.schedule.weekdays;
                this.state.tuesday = props.schedule.weekdays;
                this.state.wednesday = props.schedule.weekdays;
                this.state.thursday = props.schedule.weekdays;
                this.state.friday = props.schedule.weekdays;
            }
            this.state.unavailability = props.schedule.unavailability || [];
        }
    }

    onChange() {
        const schedule = {};
        for (const day of daysOfWeek) {
            if (this.state[day] !== undefined && this.state[day] !== null) {
                schedule[day] = this.state[day];
            }
        }
        for (const unavailability of this.state.unavailability) {
            if (unavailability !== null) {
                schedule.unavailability = schedule.unavailability || [];
                schedule.unavailability.push({
                    from: `${unavailability.from.substr(0, 10)} 00:00`,
                    to: moment(unavailability.to.substr(0, 10), 'YYYY-MM-DD').add({ days: 1 }).format('YYYY-MM-DD') + ' 00:00'
                });
            }
        }
        this.props.onChange(schedule);
    }

    onTimeChange(day, type, time) {
        this.state[day][type] = time.format('HH:mm');
        this.onChange();
    }

    addUnavailability() {
        const today = moment().format('YYYY-MM-DD');
        if (this.state.unavailability === undefined) {
            this.state.unavailability = [];
        }
        this.state.unavailability.push({
            from: today,
            to: today,
        });
        this.onChange();
        this.forceUpdate();
    }

    deleteUnavailability(index) {
        this.state.unavailability.splice(index, 1);
        this.onChange();
        this.forceUpdate();
    }

    onChangeUnavailability(index, dates) {
        if (dates.length) {
            this.state.unavailability[index] = {
                from: dates[0].format('YYYY-MM-DD'),
                to: dates[1].format('YYYY-MM-DD'),
            };
        } else {
            this.state.unavailability[index] = null;
        }
        this.onChange();
        this.forceUpdate();
    }

    enableDay(day, b) {
        if (b) {
            this.state[day] = { from: '09:00', to: '17:00' };
        } else {
            this.state[day] = null;
        }
        this.onChange();
        this.forceUpdate();
    }

    renderForDay(day) {
        return (
            <div className={'dayschedule'} key={'schedule-'+day}>
                <Row>
                    <Col span={8} className={'timedayswitch'}>
                        <Col span={12}>{upperFirst(day)}</Col>
                        <Col span={12}>
                            <Switch
                                checked={this.state && this.state[day] !== undefined && this.state[day] != null}
                                onChange={this.enableDay.bind(this, day)}
                            />
                        </Col>
                    </Col>
                    <Col span={16}>
                        {this.state && this.state[day] !== undefined && this.state[day] != null && (
                            <Row>
                                <Col xs={3} className={'timelabel'}>From: </Col>
                                <Col xs={9}>
                                    <TimePicker
                                        placeholder="From"
                                        size="large"
                                        format="HH:mm"
                                        defaultValue={moment(this.state[day].from, 'HH:mm')}
                                        onChange={this.onTimeChange.bind(this, day, 'from')}
                                        disabledMinutes={disabledMinutes}
                                        hideDisabledOptions
                                    />
                                </Col>
                                <Col xs={3} className={'timelabel'}>To: </Col>
                                <Col xs={9}>
                                    <TimePicker
                                        placeholder="From"
                                        size="large"
                                        format="HH:mm"
                                        defaultValue={moment(this.state[day].to, 'HH:mm')}
                                        onChange={this.onTimeChange.bind(this, day, 'to')}
                                        disabledMinutes={disabledMinutes}
                                        hideDisabledOptions
                                    />
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </div>
        );
    }

    getUnavailabilityFromDate(index) {
        return this.state.unavailability[index] ? moment(this.state.unavailability[index].from, 'YYYY-MM-DD') : null;
    }

    getUnavailabilityToDate(index) {
        return this.state.unavailability[index] ? moment(this.state.unavailability[index].to, 'YYYY-MM-DD') : null;
    }

    renderUnavailability(index) {
        return (
            <div className={'unavailabilityperiod'} key={'unav-'+index}>
                <Row>
                    <Col md={16}>
                        <DatePicker.RangePicker
                            onChange={this.onChangeUnavailability.bind(this, index)}
                            format={'YYYY-MM-DD'}
                            value={[
                                this.getUnavailabilityFromDate(index),
                                this.getUnavailabilityToDate(index),
                            ]}
                        />
                    </Col>
                    <Col md={8}>
                        <Button type="danger" className="ant-btn-md" onClick={this.deleteUnavailability.bind(this, index)}>
                            <Icon type="delete" /> Delete
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        let unavIndex = 0;
        return (
            <div>
                {daysOfWeek.map(day => this.renderForDay(day))}
                <h3>Periods of unavailability</h3>
                {this.state && this.state.unavailability && (
                    this.state.unavailability.map(unav => this.renderUnavailability(unavIndex++))
                )}
                <Button type="dashed" className="ant-btn-md" onClick={this.addUnavailability.bind(this)}>
                    <Icon type="plus" /> Add Date
                </Button>
            </div>
        );
    }
}


 export default WeeklySchedule;
