var adapter = require('../app/controller/adapter'),
    { rquireAuth } = require('./middlewares'),
    server = require('../app/controller/server')

module.exports = function(app) {
    // oauth
    // app.get('/', adapter.index)
    app.get('/', server.index)
    app.get('/login', adapter.login)
    app.get('/callback', adapter.handleCb)
    app.get('/dashboard', server.index)
        // app.get('/dashboard', adapter.index)

    // api
    app.get('/api/userInfo', rquireAuth, adapter.userInfo)
    app.get('/api/dashboard', rquireAuth, adapter.dashboard)
    app.get('/api/likes', rquireAuth, adapter.userLikes)
    app.post('/api/likePost', rquireAuth, adapter.likePost)
    app.post('/api/unlikePost', rquireAuth, adapter.unlikePost)

    // app.get('*', adapter.index)
}
