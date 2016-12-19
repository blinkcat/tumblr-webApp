const express = require('express'),
    path = require('path'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    secret = process.env.secret || 'blinkcat'

module.exports = function(app) {
    //添加中间件 
    app.use(express.static(path.join(__dirname, '../build')))
    nunjucks.configure('app/view', {
        express: app
    })
    app.use(cookieParser(secret))
    app.use(session({
        secret,
        resave: false,
        saveUninitialized: true
    }))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    if (process.env.NODE_ENV == 'development') {
        var webpackMiddleware = require('webpack-dev-middleware'),
            webpack = require('webpack'),
            tinylr = require('tiny-lr'),
            webpackConfig = require('../webpack.config.dev'),
            compiler = webpack(webpackConfig)

        app.use(webpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            serverSideRender: true,
            stats: {
                colors: true
            }
        })).use(require("webpack-hot-middleware")(compiler))

        // app.use(require('connect-livereload')({
        //     port: 8080
        // })).use(tinylr.middleware({ app }))

    }
    app.use(compression())
    app.use(function(err, req, res, next) {
        console.log('err', err)
        res.status(500).send('test').end()
    })
}
