var adapter = require('../app/controller/adapter.js')

module.exports = function(app) {
    app.get('/', adapter.index)
    app.get('/login', adapter.login)
    app.get('/callback', adapter.handleCb)
}