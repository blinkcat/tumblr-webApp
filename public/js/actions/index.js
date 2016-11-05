import { CALL_API } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import { api } from '../util'

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
                    console.log('here')
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
