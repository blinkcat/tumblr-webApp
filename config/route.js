let api = require('../app/controller/api'),
    oauth = require('../app/controller/oauth'),
    server = require('../app/controller/server'),
    { requireAuth } = require('./middlewares'),
    express = require('express')

module.exports = function(app) {
    // common router
    var router = express.Router()
    router.get('/login', oauth.login)
    router.get('/callback', oauth.handleCb)
    router.use(requireAuth)
    router.get('/', server.index)
    router.get('/dashboard', server.index)
    router.get('/likes', server.index)
    router.get('/following', server.index)

    // api router
    var apiRouter = express.Router()
    apiRouter.use(requireAuth)
    apiRouter.get('/userInfo', api.userInfo)
    apiRouter.get('/dashboard', api.dashboard)
    apiRouter.get('/likes', api.userLikes)
    apiRouter.get('/following', api.userFollowing)
    apiRouter.post('/likePost', api.likePost)
    apiRouter.post('/unlikePost', api.unlikePost)

    app.use('/', router)
    app.use('/api', apiRouter)
}
