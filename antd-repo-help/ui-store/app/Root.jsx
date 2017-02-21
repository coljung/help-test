// Dependencies
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import * as moment from 'moment';

// Global Styles
import './styles/index';

// Store
import configureStore from './configureStore.js';

const store = configureStore();

moment.locale('us');

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router routes={routes} history={browserHistory} />
            </Provider>
        );
    }
}
