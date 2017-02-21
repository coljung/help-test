import { REQUEST_STORES, RECEIVE_STORES, RECEIVE_STORE_DETAIL, RECEIVE_STORE_SAVE, SHOW_CREATE_STORE_FORM } from './storeActions.js';

const initialState = {
  stores: [],
  fetchReady: false,
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_STORES:
        return Object.assign({}, state, {
            fetchReady: false,
        });
    case RECEIVE_STORES:
        return Object.assign({}, state, {
            stores: action.stores,
            fetchReady: true,
        });
    case RECEIVE_STORE_DETAIL:
    case RECEIVE_STORE_SAVE:
        return Object.assign({}, state, {
            store: action.store,
        });
    case SHOW_CREATE_STORE_FORM:
        return Object.assign({}, state, {
            store: null,
        });
    default:
        return state;
  }
};

export default storeReducer;
