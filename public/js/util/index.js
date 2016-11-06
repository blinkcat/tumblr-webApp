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
const user = new Schema('users', { idAttribute: 'name' }),
    post = new Schema('posts')

const api = {
    userInfo: { path: `${abPath}/api/userInfo`, schema: { user } },
    dashboard: { path: `${abPath}/api/dashboard`, schema: { posts: arrayOf(post) } },
    likes: { path: `${abPath}/api/likes`, schema: { posts: arrayOf(post) } }
}

export { api }
