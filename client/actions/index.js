import { CALL_API } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import set from 'lodash/set'
import without from 'lodash/without'
import { api } from '../util'
import fetch from 'isomorphic-fetch'
import { credentials } from '../../config'

export const USERINFO_REQUEST = 'USERINFO_REQUEST'
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS'
export const USERINFO_FAILURE = 'USERINFO_FAILURE'

const fetchUserInfo = () => ({
    [CALL_API]: {
        types: [
            USERINFO_REQUEST,
            USERINFO_SUCCESS,
            USERINFO_FAILURE
        ],
        method: 'GET',
        endpoint: api.userInfo.path,
        credentials
    }
})

export const loadUserInfo = () => (dispatch, getState) => {
    if (!getState().user) {
        return dispatch(fetchUserInfo())
    }
}

export const DASHBOARD_REQUEST = 'DASHBOARD_REQUEST'
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS'
export const DASHBOARD_FAILURE = 'DASHBOARD_FAILURE'

const fetchDashBoard = ({ limit, offset }) => ({
    [CALL_API]: {
        types: [
            DASHBOARD_REQUEST, {
                type: DASHBOARD_SUCCESS,
                payload: (action, state, res) => {
                    const contentType = res.headers.get('Content-Type')
                    if (contentType && ~contentType.indexOf('json')) {
                        return res.json().then((json) => normalize(json, api.dashboard.schema))
                    }
                }
            },
            DASHBOARD_FAILURE
        ],
        method: 'GET',
        endpoint: `${api.dashboard.path}?limit=${limit}&offset=${offset}`,
        credentials
    }
})

export const loadDashBoard = () => (dispatch, getState) => {
    var dashboard = getState().pagination.dashboard
    if (!dashboard.isFetching) {
        return dispatch(fetchDashBoard({ limit: 10, offset: 10 * (dashboard.page - 1) }))
    }
}

export const LIKES_REQUEST = 'LIKES_REQUEST'
export const LIKES_SUCCESS = 'LIKES_SUCCESS'
export const LIKES_FAILURE = 'LIKES_FAILURE'
export const LIKES_CHANGE = 'LIKES_CHANG'

const fetchLikes = ({ limit, offset }) => ({
    [CALL_API]: {
        types: [
            LIKES_REQUEST, {
                type: LIKES_SUCCESS,
                payload: (action, state, res) => {
                    const contentType = res.headers.get('Content-Type')
                    if (contentType && ~contentType.indexOf('json')) {
                        return res.json().then((json) => normalize(json, api.likes.schema))
                    }
                }
            },
            LIKES_FAILURE
        ],
        method: 'GET',
        endpoint: `${api.likes.path}?limit=${limit}&offset=${offset}`,
        credentials
    }
})

export const loadLikes = () => (dispatch, getState) => {
    var likes = getState().pagination.likes
    if (!likes.isFetching) {
        if (likes.liked_count && likes.liked_count <= 10 * (likes.page - 1)) {
            return
        }
        return dispatch(fetchLikes({ limit: 10, offset: 10 * (likes.page - 1) }))
    }
}

export const FOLLOWING_REQUEST = 'FOLLOWING_REQUEST'
export const FOLLOWING_SUCCESS = 'FOLLOWING_SUCCESS'
export const FOLLOWING_FAILURE = 'FOLLOWING_FAILURE'

const fetchFollowing = ({ limit, offset }) => ({
    [CALL_API]: {
        types: [
            FOLLOWING_REQUEST, {
                type: FOLLOWING_SUCCESS,
                payload: (action, state, res) => {
                    const contentType = res.headers.get('Content-Type')
                    if (contentType && ~contentType.indexOf('json')) {
                        return res.json().then((json) => normalize(json, api.following.schema))
                    }
                }
            },
            FOLLOWING_FAILURE
        ],
        method: 'GET',
        endpoint: `${api.following.path}?limit=${limit}&offset=${offset}`,
        credentials
    }
})

export const loadFollowing = () => (dispatch, getState) => {
    var following = getState().pagination.following
    if (!following.isFetching) {
        console.log('following', following)
        if (following.total_blogs && following.total_blogs <= 10 * (following.page - 1)) {
            return
        }
        return dispatch(fetchFollowing({ limit: 10, offset: 10 * (following.page - 1) }))
    }
}

export const likePost = ({ id, reblogKey, dispatch, cb }) => {
    fetch(api.likePost.path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ id, reblogKey }),
        credentials
    }).then((res) => {
        return res.json()
    }).then((data) => {
        cb && cb()
        dispatch((dispatch, getState) => {
            dispatch(set({ type: LIKES_CHANGE },
                'pagination.likes',
                getState().pagination.likes.liked_posts.unshift(id)
            ))
        })
    }).catch(e => {
        console.log(e.message)
    })
}

export const unlikePost = ({ id, reblogKey, dispatch, cb }) => {
    fetch(api.unlikePost.path, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ id, reblogKey }),
        credentials
    }).then((res) => {
        return res.json()
    }).then((data) => {
        cb && cb()
        dispatch((dispatch, getState) => {
            dispatch(set({ type: LIKES_CHANGE },
                'pagination.likes',
                without(getState().pagination.likes.liked_posts, id)
            ))
        })
    }).catch(e => {
        console.log(e.message)
    })
}
