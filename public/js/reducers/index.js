import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import union from 'lodash/union'
import { combineReducers } from 'redux'
import * as Actions from '../actions'

const entities = (state = {posts:{}}, action) => {
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

const paginate = ({ types }) => {
    const [requestType, successType, failureType] = types

    return function(state = {
        isFetching: false,
        page: 1,
        posts: [],
        count: undefined
    }, action) {
        switch (action.type) {
            case requestType:
                return merge({}, state, { isFetching: true })
            case successType:
                return merge({}, state, {
                    isFetching: false,
                    page: state.page + 1,
                    posts: union(state.posts, action.payload.result.posts),
                    count: action.payload.count
                })
            case failureType:
                return merge({}, state, { isFetching: false })
            default:
                return state
        }
    }
}

const pagination = combineReducers({
    dashboard: paginate({ types: [Actions.DASHBOARD_REQUEST, Actions.DASHBOARD_SUCCESS, Actions.DASHBOARD_FAILURE] })
})

const rootReducer = combineReducers({ entities, user, pagination })
export default rootReducer
