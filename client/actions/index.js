import { CALL_API } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import { api } from '../util'
import fetch from 'isomorphic-fetch'

var credentials = 'omit'
if (process.env.NODE_ENV == 'production') {
    credentials = 'same-origin'
} else if (process.env.NODE_ENV == 'development') {
    credentials = 'include'
}

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
        if (likes.count && likes.count <= 10 * (likes.page - 1)) {
            return
        }
        return dispatch(fetchLikes({ limit: 10, offset: 10 * (likes.page - 1) }))
    }
}


export const likePost = ({ id, reblogKey, cb }) => {
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
    }).catch(e => {
        console.log(e.message)
    })
}

export const unlikePost = ({ id, reblogKey, cb }) => {
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
    }).catch(e => {
        console.log(e.message)
    })
}
