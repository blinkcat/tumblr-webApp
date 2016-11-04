import { CALL_API } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import { api } from '../util'

export const USERINFO_REQUEST = 'USERINFO_REQUEST'
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS'
export const USERINFO_FAILURE = 'USERINFO_FAILURE'

const fetchUserInfo = () => ({
    [CALL_API]: {
        types: [
            USERINFO_REQUEST,
            USERINFO_SUCCESS,
            // {
            //     type: USERINFO_SUCCESS,
            //     payload: (action, state, res) => {
            //         const contentType = res.headers.get('Content-Type')
            //         if (contentType && ~contentType.indexOf('json')) {
            //             return res.json().then((json) => normalize(json, api.userInfo.schema))
            //         }
            //     }
            // },
            USERINFO_FAILURE
        ],
        method: 'GET',
        endpoint: api.userInfo.path,
        credentials: 'include' //'same-origin'
    }
})

export const loadUserInfo = () => (dispatch, getState) => {
    if (!getState().user) {
        return dispatch(fetchUserInfo())
    }
}
