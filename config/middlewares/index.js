var adapter = require('../../app/controller/adapter')

exports.rquireAuth = function(req, res, next) {
    if (!adapter.isClientOK()) {
        res.status(401).json({ error: true, message: 'you have no authorization' })
    } else {
        next()
    }
}
