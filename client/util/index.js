import { Schema, arrayOf } from 'normalizr'
import { apiURL } from '../../config'

//schema
const user = new Schema('users', { idAttribute: 'name' }),
    post = new Schema('posts'),
    blog = new Schema('blogs', { idAttribute: 'name' })

const url = `${apiURL}/api/`

const api = {
    userInfo: { path: `${url}userInfo`, schema: { user } },
    dashboard: { path: `${url}dashboard`, schema: { posts: arrayOf(post) } },
    likes: { path: `${url}likes`, schema: { liked_posts: arrayOf(post) } },
    following: { path: `${url}following`, schema: { blogs: arrayOf(blog) } },
    blogPosts: { path: `${url}blogPosts`, schema: { posts: arrayOf(post) } },
    likePost: { path: `${url}likePost` },
    unlikePost: { path: `${url}unlikePost` }
}

const AppBarStyle = {
    COMMON_STYLE: 0,
    BLOG_STYLE: 1
}

export { api, AppBarStyle }
