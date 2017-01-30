let api = require('../app/controller/api'),
    oauth = require('../app/controller/oauth'),
    { requireAuth } = require('./middlewares'),
    server = require('../app/controller/server')

module.exports = function(app) {
    // oauth
    app.get('/', server.index)
    app.get('/login', oauth.login)
    app.get('/callback', oauth.handleCb)
    app.get('/dashboard', server.index)
    app.get('/likes', server.index)

    // api
    app.get('/api/userInfo', requireAuth, api.userInfo)
    app.get('/api/dashboard', requireAuth, api.dashboard)
    app.get('/api/likes', requireAuth, api.userLikes)
    app.get('/api/following', requireAuth, api.userFollowing)
    app.post('/api/likePost', requireAuth, api.likePost)
    app.post('/api/unlikePost', requireAuth, api.unlikePost)

    // app.get('*', api.index)
}
