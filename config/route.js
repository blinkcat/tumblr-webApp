var adapter = require('../app/adapter.js')

module.exports = function(app) {
    app.get('/', adapter.login)
    app.get('/callback', adapter.handleCb)
}
