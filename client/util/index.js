import { Schema, arrayOf } from 'normalizr'
import { apiURL } from '../../config'

//schema
const user = new Schema('users', { idAttribute: 'name' }),
    post = new Schema('posts'),
    blog = new Schema('blogs', { idAttribute: 'name' })

const api = {
    userInfo: { path: `${apiURL}/api/userInfo`, schema: { user } },
    dashboard: { path: `${apiURL}/api/dashboard`, schema: { posts: arrayOf(post) } },
    likes: { path: `${apiURL}/api/likes`, schema: { liked_posts: arrayOf(post) } },
    following: { path: `${apiURL}/api/following`, schema: { blogs: arrayOf(blog) } },
    likePost: { path: `${apiURL}/api/likePost` },
    unlikePost: { path: `${apiURL}/api/unlikePost` }
}

export { api }
