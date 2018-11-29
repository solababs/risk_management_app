import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from '../reducers';
import { DEV_MODE } from '../constants';


let Store

if (DEV_MODE){
    Store = createStore(Reducers, compose(applyMiddleware(thunkMiddleware, createLogger()),devTools()));
} else {
    Store = createStore(Reducers, compose(applyMiddleware(thunkMiddleware)));
}

export default Store;