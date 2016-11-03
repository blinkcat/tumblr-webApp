var adapter = require('../../app/controller/adapter')

exports.rquireAuth = function(req, res, next) {
    const { token, secret } = req.signedCookies
    if (!adapter.isClientOK()) {
        if (token && secret) {
            try {
            	console.log('createClient')
                adapter.createClient({ token, secret })
                next()
            } catch (e) {
                console.log(e.message)
                res.status(401).json({ error: true, message: 'you have no authorization' })
            }
        } else {
            res.status(401).json({ error: true, message: 'you have no authorization' })
        }
    } else {
        next()
    }
}
