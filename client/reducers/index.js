import merge from 'lodash/merge'
import union from 'lodash/union'
import without from 'lodash/without'
import { combineReducers } from 'redux'
import { AppBarStyle } from '../util'
import * as Actions from '../actions'

const entities = (state = { posts: {}, blogs: {} }, action) => {
    if (action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities)
    }
    if (action.type == Actions.TOGGLE_LIKE) {
        if (action.payload.like) {
            return merge({}, state, {
                posts: {
                    [action.payload.postId]: { liked: true }
                }
            })
        } else {
            return merge({}, state, {
                posts: {
                    [action.payload.postId]: { liked: false }
                }
            })
        }
    }
    return state
}

const user = (state = null, action) => {
    if (action.payload && action.payload.user) {
        return action.payload.user
    }
    if (action.type == Actions.TOGGLE_LIKE) {
        if (action.payload.like) {
            return merge({}, state, { likes: state.likes + 1 })
        } else {
            return merge({}, state, { likes: state.likes - 1 })
        }
    }
    return state
}

const paginate = ({ types, arrayName = 'posts', countName = 'count' }) => {
    const [requestType, successType, failureType, toggleType] = types

    return function(state = {
        isFetching: false,
        page: 0,
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
                    [arrayName]: union(state[arrayName], action.payload.result[arrayName]),
                    [countName]: action.payload.result[countName]
                })
            case failureType:
                return merge({}, state, { isFetching: false })
            case toggleType:
                if (action.payload.like) {
                    return merge({}, state, {
                        [arrayName]: union([action.payload.postId], state[arrayName])
                    })
                } else {
                    return merge({}, state, {
                        [arrayName]: without(state[arrayName], action.payload.postId)
                    })
                }
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
        types: [Actions.LIKES_REQUEST, Actions.LIKES_SUCCESS, Actions.LIKES_FAILURE, Actions.TOGGLE_LIKE],
        arrayName: 'liked_posts',
        countName: 'liked_count'
    }),
    following: paginate({
        types: [Actions.FOLLOWING_REQUEST, Actions.FOLLOWING_SUCCESS, Actions.FOLLOWING_FAILURE],
        arrayName: 'blogs',
        countName: 'total_blogs'
    })
})

const blogs = (state = {}, action) => {
    var { blog_name = '' } = action.meta || {}
    if (!blog_name) {
        return state
    }
    var ori = state[blog_name] || {},
        oriPage = ori.page,
        oriPosts = ori.posts

    switch (action.type) {
        case Actions.BLOGPOST_REQUEST:
            return merge({}, state, {
                [blog_name]: { isFetching: true, page: oriPage || 0, posts: oriPosts || [] }
            })
        case Actions.BLOGPOST_SUCCESS:
            return merge({}, state, {
                [blog_name]: {
                    isFetching: false,
                    page: oriPage ? oriPage + 1 : 1,
                    posts: union(oriPosts ? oriPosts : [], action.payload.result['posts']),
                    total_posts: action.payload.result['total_posts']
                }
            })
        case Actions.BLOGPOST_FAILURE:
            return merge({}, state, {
                [blog_name]: {
                    isFetching: false
                }
            })
        default:
            return state
    }
}

const appbar = (state = { style: AppBarStyle.COMMON_STYLE }, action) => {
    switch (action.type) {
        case Actions.CHANGE_APPBAR:
            return merge({}, state, action.payload)
        default:
            return state
    }
}

const error = (state = { error: false, type: '' }, action) => {
    if (action.error) {
        return merge({}, state, { error: true, type: action.type }, action.payload)
    } else {
        return { error: false, type: '' }
    }
}

const rootReducer = combineReducers({ entities, user, pagination, error, blogs, appbar })
export default rootReducer
