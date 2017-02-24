let {
    isClientReady,
    createClient,
    getClient
} = require('../../app/model/tumblr')

exports.requireAuth = function(req, res, next) {
    const { token, secret } = req.signedCookies
    try {
        if (!isClientReady()) {
            if (token && secret) {
                res.client = createClient({ token, secret })
                next()
            } else {
                if (req.xhr) {
                    res.status(401).json({ error: true, message: 'you have no authorization' })
                } else {
                    res.redirect('/login')
                }
            }
        } else {
            res.client = getClient()
            next()
        }
    } catch (e) {
        next(e)
    }
}
