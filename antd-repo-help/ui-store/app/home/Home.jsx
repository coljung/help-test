import React, { Component } from 'react';

import { DatePicker, Button, Icon } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;
// styles
import '../styles/home';

function onChange(date, dateString) {
  console.log(date, dateString);
}

class Home extends Component {
    render() {
        return (
            <div>---------------- HOME -------------------
                <div>
                   <DatePicker onChange={onChange} />
                   <br />
                   <MonthPicker onChange={onChange} />
                   <br />
                   <RangePicker onChange={onChange} />
                 </div>
                 <div>
                                <Button type="primary" className='test' size="large">
                                    <Icon type="plus-circle-o" /> Primary
                                </Button>
                                <Button>Default</Button>
                                <Button type="ghost">Ghost</Button>
                                <Button type="dashed">Dashed</Button>
                              </div>
            </div>
        );
    }
}

export default Home;
