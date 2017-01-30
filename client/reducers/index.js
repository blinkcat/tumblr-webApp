import merge from 'lodash/merge'
import union from 'lodash/union'
import { combineReducers } from 'redux'
import * as Actions from '../actions'

const entities = (state = { posts: {}, blogs: {} }, action) => {
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

const paginate = ({ types, arrayName = 'posts', countName = 'count' }) => {
    const [requestType, successType, failureType] = types

    return function(state = {
        isFetching: false,
        page: 1,
        [arrayName]: [],
        [countName]: undefined
    }, action) {
        switch (action.type) {
            case requestType:
                return merge({}, state, { isFetching: true })
            case successType:
                return merge({}, state, {
                    isFetching: false,
                    page: state.page + 1,
                    [arrayName]: union(state.posts, action.payload.result[arrayName]),
                    [countName]: action.payload.result.count
                })
            case failureType:
                return merge({}, state, { isFetching: false })
            default:
                return state
        }
    }
}

const pagination = combineReducers({
    dashboard: paginate({
        types: [Actions.DASHBOARD_REQUEST, Actions.DASHBOARD_SUCCESS, Actions.DASHBOARD_FAILURE]
    }),
    likes: paginate({
        types: [Actions.LIKES_REQUEST, Actions.LIKES_SUCCESS, Actions.LIKES_FAILURE],
        arrayName: 'liked_posts',
        countName: 'liked_count'
    }),
    following: paginate({
        types: [Actions.FOLLOWING_REQUEST, Actions.FOLLOWING_SUCCESS, Actions.FOLLOWING_FAILURE],
        arrayName: 'blogs',
        countName: 'total_blogs'
    })
})

const rootReducer = combineReducers({ entities, user, pagination })
export default rootReducer
