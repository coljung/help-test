import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import IndexRedirect from 'react-router/lib/IndexRedirect';
// Admin Views
import App from './components/App';
import Home from './home/Home';
import StoreList from './stores/StoreList';
import StoreForm from './stores/StoreForm';
import FittingRoomList from './fitting-rooms/FittingRoomList';
import FittingRoomForm from './fitting-rooms/FittingRoomForm';
import Stylists from './stylists/Stylists';
import StylistsForm from './stylists/StylistsForm';
import Appointments from './appointments/Appointments';
import AppointmentsForm from './appointments/AppointmentsForm';

const requireAuth = ((next, replace, callback) => {
	console.log('NEED TO AUTHENTICATE/AUTHORIZE HERE');
    callback();
});

const authOnEnter = ((next, replace, callback) => {
    requireAuth(next, replace, callback);
});

const authOnChange = ((prev, next, replace, callback) => {
    requireAuth(next, replace, callback);
});

export default (
    <Route path="admin" component={App} onEnter={authOnEnter} onChange={authOnChange} >
        <IndexRoute components={Home} />
        <Route path="/admin/stores">
            <IndexRoute component={StoreList}/>
            <Route path=':id' component={StoreForm} />
        </Route>
        <Route path="/admin/appointments">
            <IndexRoute components={Appointments} />
            <Route path=":id" component={AppointmentsForm} />
        </Route>
        <Route path="/admin/stylists">
            <IndexRoute components={Stylists} />
            <Route path=":id" component={StylistsForm} />
        </Route>
        <Route path='/admin/fitting-rooms'>
            <IndexRoute component={FittingRoomList}/>
            <Route path=':id' component={FittingRoomForm} />
        </Route>
    </Route>
);
