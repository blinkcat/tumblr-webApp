import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

const entities = (state = {}, action) => {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities)
    }
    return state
}

const user = (state = null, action) => {
    if (action.payload && action.payload.user) {
        return action.payload.user
    }
    return state
}

const rootReducer = combineReducers({ entities, user })
export default rootReducer
