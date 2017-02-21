import agent from 'superagent';
import wrap from 'superagent-promise';
import { getApiUrl } from '../helpers';
import { messages } from '../notifications/notificationActions';

const request = wrap(agent, Promise);

export const REQUEST_STORES = 'REQUEST_STORES';
export const RECEIVE_STORES = 'RECEIVE_STORES';
export const CREATE_STORE = 'CREATE_STORE';
export const REQUEST_STORE_DETAIL = 'REQUEST_STORE_DETAIL';
export const RECEIVE_STORE_DETAIL = 'RECEIVE_STORE_DETAIL';
export const CANCEL_EDIT_STORE = 'CANCEL_EDIT_STORE';
export const REQUEST_STORE_SAVE = 'REQUEST_STORE_SAVE';
export const RECEIVE_STORE_SAVE = 'RECEIVE_STORE_SAVE';
export const SHOW_CREATE_STORE_FORM = 'SHOW_CREATE_STORE_FORM';

export function showCreateStoreForm() {
    return {
        type: SHOW_CREATE_STORE_FORM,
    };
}

function requestStoreDetail() {
    return {
        type: REQUEST_STORE_DETAIL,
    };
}

function receiveStoreDetail(store) {
    return {
        type: RECEIVE_STORE_DETAIL,
        store,
    };
}

function requestStoreSave(store) {
    return {
        type: REQUEST_STORE_SAVE,
        store,
    };
}

function receiveStoreSave(store) {
    return {
        type: RECEIVE_STORE_SAVE,
        store,
    };
}

function requestStores() {
    return {
        type: REQUEST_STORES,
    };
}

function receiveStores(stores) {
    return {
        type: RECEIVE_STORES,
        stores,
    };
}

export function getStoreDetail(id) {
    return (dispatch) => {
        dispatch(requestStoreDetail());

        request
            .get(`${getApiUrl()}stores/${id}`)
            .end((err, res) => {
                if (err) {
                    return dispatch(messages({ content: err, response: res, isError: true }));
                }
                return dispatch(receiveStoreDetail(res.body));
            });
    };
}

export function saveStore(store) {
    return (dispatch) => {
        dispatch(requestStoreSave(store));

        let req = null;
        if (store.id) {
            req = request.patch(`${getApiUrl()}stores/${store.id}`);
        } else {
            req = request.post(`${getApiUrl()}stores/`);
        }

        return req.send(store)
            .end((err, res) => {
                if (err) {
                    return dispatch(messages({ content: err, response: res, isError: true }));
                }
                dispatch(messages({ content: 'Store saved successfully!', response: '', isError: false }));
                return dispatch(receiveStoreSave(res.body));
            });
    };
}

export function fetchStores(page = 1) {
    return (dispatch) => {
        dispatch(requestStores());
        request
            .get(`${getApiUrl()}stores?page=${page}`)
            .end((err, res) => {
                if (err) {
                    return dispatch(messages({ content: err, response: res, isError: true }));
                }
                return dispatch(receiveStores(res.body));
            });
    };
}
