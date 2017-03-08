module.exports = {
    test: require('./env/test'),
    development: require('./env/development'),
    production: require('./env/production')
}[process.env.NODE_ENV || 'development']
