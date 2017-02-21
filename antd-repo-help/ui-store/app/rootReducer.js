import { combineReducers } from 'redux';
import storeReducer from './stores/storeReducer';
import FittingRoomsReducer from './fitting-rooms/FittingRoomsReducer.jsx'; // @todo figure why this import requires jsx
import StylistsReducer from './stylists/StylistsReducer';
import AppointmentsReducer from './appointments/AppointmentsReducer';
import message from './notifications/notificationReducer';

export default combineReducers({
    storeReducer,
    FittingRoomsReducer,
    StylistsReducer,
    AppointmentsReducer,
    message,
});
