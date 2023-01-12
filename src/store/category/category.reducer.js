import {CATEGORIES_ACTION_TYPES} from './category.types'

export const CATEGORIES_INITIAL_SATATE = {
    categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_SATATE, action = {}) => {
    const {type, payload} = action;
    switch(type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {...state, categoriesMap: payload}
        default:
            return state;
    }
}