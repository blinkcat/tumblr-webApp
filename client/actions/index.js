import { CALL_API, getJSON, ApiError } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import set from 'lodash/set'
import without from 'lodash/without'
import { api } from '../util'
import fetch from 'isomorphic-fetch'
import { credentials, pageSize } from '../../config'

export const USERINFO_REQUEST = 'USERINFO_REQUEST'
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS'
export const USERINFO_FAILURE = 'USERINFO_FAILURE'

export const fetchUserInfo = () => ({
    [CALL_API]: {
        types: [
            USERINFO_REQUEST,
            USERINFO_SUCCESS,
            USERINFO_FAILURE
        ],
        method: 'GET',
        endpoint: api.userInfo.path,
        bailout: (state) => {
            if (state.user) {
                return true
            }
            return false
        },
        credentials
    }
})

export const DASHBOARD_REQUEST = 'DASHBOARD_REQUEST'
export const DASHBOARD_SUCCESS = 'DASHBOARD_SUCCESS'
export const DASHBOARD_FAILURE = 'DASHBOARD_FAILURE'

export const fetchDashBoard = ({ limit = pageSize, offset = 0 } = {}) => ({
    [CALL_API]: {
        types: [
            DASHBOARD_REQUEST, {
                type: DASHBOARD_SUCCESS,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => normalize(json, api.dashboard.schema))
                }
            }, {
                type: DASHBOARD_FAILURE,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => new ApiError(res.status, res.statusText, json))
                }
            }
        ],
        method: 'GET',
        endpoint: (state) => {
            var dashboard = state.pagination.dashboard
            return `${api.dashboard.path}?limit=${limit}&offset=${offset||limit*(dashboard.page)}`
        },
        bailout: (state) => {
            var dashboard = state.pagination.dashboard
            if (dashboard.isFetching) {
                return true
            }
            return false
        },
        credentials
    }
})

export const LIKES_REQUEST = 'LIKES_REQUEST'
export const LIKES_SUCCESS = 'LIKES_SUCCESS'
export const LIKES_FAILURE = 'LIKES_FAILURE'

export const fetchLikes = ({ limit = pageSize, offset = 0 } = {}) => ({
    [CALL_API]: {
        types: [
            LIKES_REQUEST, {
                type: LIKES_SUCCESS,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => normalize(json, api.likes.schema))
                }
            }, {
                type: LIKES_FAILURE,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => new ApiError(res.status, res.statusText, json))
                }
            }
        ],
        method: 'GET',
        endpoint: (state) => {
            var likes = state.pagination.likes
            return `${api.likes.path}?limit=${limit}&offset=${offset||limit*(likes.page)}`
        },
        bailout: (state) => {
            var likes = state.pagination.likes
            if (likes.isFetching) {
                return true
            } else {
                if (likes.liked_count && likes.liked_count <= limit * (likes.page)) {
                    return true
                }
            }
            return false
        },
        credentials
    }
})

export const FOLLOWING_REQUEST = 'FOLLOWING_REQUEST'
export const FOLLOWING_SUCCESS = 'FOLLOWING_SUCCESS'
export const FOLLOWING_FAILURE = 'FOLLOWING_FAILURE'

export const fetchFollowing = ({ limit = pageSize, offset = 0 } = {}) => ({
    [CALL_API]: {
        types: [
            FOLLOWING_REQUEST, {
                type: FOLLOWING_SUCCESS,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => normalize(json, api.following.schema))
                }
            }, {
                type: FOLLOWING_FAILURE,
                payload: (action, state, res) => {
                    return getJSON(res).then((json) => new ApiError(res.status, res.statusText, json))
                }
            }
        ],
        method: 'GET',
        endpoint: (state) => {
            var following = state.pagination.following
            return `${api.following.path}?limit=${limit}&offset=${offset||limit*(following.page)}`
        },
        bailout: (state) => {
            var following = state.pagination.following
            if (following.isFetching) {
                return true
            } else {
                if (following.total_blogs && following.total_blogs <= limit * (following.page)) {
                    return true
                }
            }
            return false
        },
        credentials
    }
})

export const BLOGPOST_REQUEST = 'BLOGPOST_REQUEST'
export const BLOGPOST_SUCCESS = 'BLOGPOST_SUCCESS'
export const BLOGPOST_FAILURE = 'BLOGPOST_FAILURE'

export const fetchBlogPosts = ({ blog_name, limit = pageSize, offset = 0 } = {}) => ({
    [CALL_API]: {
        types: [{
            type: BLOGPOST_REQUEST
            meta: { blog_name }
        }, {
            type: BLOGPOST_SUCCESS,
            payload: (action, state, res) => {
                return getJSON(res).then((json) => normalize(json, api.likes.schema))
            },
            meta: { blog_name }
        }, {
            type: BLOGPOST_FAILURE,
            payload: (action, state, res) => {
                return getJSON(res).then((json) => new ApiError(res.status, res.statusText, json))
            },
            meta: { blog_name }
        }],
        method: 'GET',
        endpoint: (state) => {
            var blog = state.blogs[blog_name]
            return `${api.blogPosts.path}?blog_name=${blog_name}&limit=${limit}&offset=${offset||limit*(blog.page)}`
        },
        bailout: (state) => {
            if (!blog_name) {
                return true
            }
            var blog = state.blogs[blog_name]
            if (blog.isFetching) {
                return true
            } else {
                if (blog.total_posts && blog.total_posts <= limit * (blog.page)) {
                    return true
                }
            }
            return false
        },
        credentials
    }
})

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
