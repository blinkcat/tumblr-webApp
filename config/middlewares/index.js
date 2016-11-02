var adapter = require('../../app/controller/adapter')

exports.rquireAuth = function(req, res, next) {
    if (adapter.client == null) {
        res.json({ error: true, message: 'you have no authorization' })
        return
    } else {
        next()
    }
}
