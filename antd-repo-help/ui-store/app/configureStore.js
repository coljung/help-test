import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk';
import devTools from "remote-redux-devtools";
import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {

  const enhancer = compose(
      applyMiddleware(thunkMiddleware),
      devTools()
  );
  return createStore(
    rootReducer,
    preloadedState,
    enhancer
  )
}