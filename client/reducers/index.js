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

const blogs = (state = {}, action) => {
    var { blog_name='' } = action.meta
    console.log('blog_name', blog_name)
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

const error = (state = { error: false, type: '' }, action) => {
    if (action.error) {
        return merge({}, state, { error: true, type: action.type }, action.payload)
    } else {
        return { error: false, type: '' }
    }
}

const rootReducer = combineReducers({ entities, user, pagination, error, blogs })
export default rootReducer
