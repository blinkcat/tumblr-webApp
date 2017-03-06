var express = require('express')
var { requireAuth } = require('../middleware')
var api = require('../controller/api')

var apiRouter = express.Router()
apiRouter.use(requireAuth)
apiRouter.get('/userInfo', api.userInfo)
apiRouter.get('/dashboard', api.dashboard)
apiRouter.get('/likes', api.userLikes)
apiRouter.get('/following', api.userFollowing)
apiRouter.get('/blogPosts', api.blogPosts)
apiRouter.post('/likePost', api.likePost)
apiRouter.post('/unlikePost', api.unlikePost)

module.exports = apiRouter
