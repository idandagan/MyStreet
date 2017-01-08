import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'state/reducers';
import loggingMiddleWare from 'middleware/logging-middleware';

export default function configureStore() {
    const combinedReducers = combineReducers(Object.assign({}, reducers));

    const store = createStore(
        combinedReducers,
        applyMiddleware(
            thunk,
            loggingMiddleWare,
        )
    );

    return store;
}
