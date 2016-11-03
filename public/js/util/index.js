import { Schema, arrayOf } from 'normalizr'

var abPath = '',
    curEnv = process.env.NODE_ENV
if (curEnv == 'development') {
    abPath = 'http://localhost:8080'
} else if (curEnv == 'production') {
    abPath = ''
} else {
    abPath = ''
}

//schema
const user = new Schema('users', { idAttribute: 'name' })

const api = {
    userInfo: { path: `${abPath}/api/userInfo`, schema: { user } }
}

export { api }
