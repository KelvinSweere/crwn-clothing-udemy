import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    next(action);
}

const middlewares = [logger]

const composedEnhances = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhances);
