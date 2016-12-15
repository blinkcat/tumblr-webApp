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
    app.use(compression())
    if (process.env.NODE_ENV == 'development') {
        var webpackMiddleware = require('webpack-dev-middleware'),
            webpack = require('webpack')
        app.use(webpackMiddleware(webpack(require('../webpack.config.dev')), {
            // serverSideRender: true
            stats: {
                colors: true
            }
        }))
    }
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
    app.use(function(err, req, res, next) {
        console.log('err', err)
        res.status(500).send('test').end()
    })
}
