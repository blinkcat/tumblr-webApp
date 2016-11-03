import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'

const entities = (state = { users: {} }, action) => {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities)
    }
    return state
}

const rootReducer = combineReducers({ entities })
export default rootReducer
