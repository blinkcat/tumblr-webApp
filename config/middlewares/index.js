let {
    isClientReady,
    createClient
} = require('../../app/model/tumblr')
const refresh = require('../../app/controller/api').refresh
exports.requireAuth = function(req, res, next) {
    const { token, secret } = req.signedCookies
    if (!isClientReady()) {
        if (token && secret) {
            createClient({ token, secret })
            refresh()
            next()
        } else {
            res.status(401).json({ error: true, message: 'you have no authorization' })
        }
    } else {
        next()
    }
}
