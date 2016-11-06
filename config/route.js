var adapter = require('../app/controller/adapter'),
    { rquireAuth } = require('./middlewares')

module.exports = function(app) {
    // oauth
    app.get('/', adapter.index)
    app.get('/login', adapter.login)
    app.get('/callback', adapter.handleCb)

    // api
    app.get('/api/userInfo', rquireAuth, adapter.userInfo)
    app.get('/api/dashboard', rquireAuth, adapter.dashboard)
    app.get('/api/likes', rquireAuth, adapter.userLikes)
}
