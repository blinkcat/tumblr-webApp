var routerPath = '../app/router/'
const webRouter = require(`${routerPath}web.router`),
    apiRouter = require(`${routerPath}api.router`)

module.exports = function(app) {
    app.use('/', webRouter)
    app.use('/api', apiRouter)
}
