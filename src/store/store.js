import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    console.log('type ', action.type);
    console.log('payload ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);
}


const middlewares = [logger]

const composedEnhances = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhances);
