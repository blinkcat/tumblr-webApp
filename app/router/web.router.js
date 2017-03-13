var oauth = require('../controller/oauth'),
    server = require('../controller/server'),
    express = require('express'),
    { requireAuth } = require('../middleware')


var webRouter = express.Router()
webRouter.get('/login', oauth.login)
webRouter.get('/callback', oauth.handleCb)
webRouter.use(requireAuth)
webRouter.get('/', server.index)
webRouter.get('/dashboard', server.index)
webRouter.get('/likes', server.index)
webRouter.get('/following', server.index)
webRouter.get('/blog/:blog_name', server.index)

module.exports = webRouter
