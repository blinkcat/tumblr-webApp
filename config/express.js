const express = require('express'),
    path = require('path'),
    compression = require('compression'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    secret = process.env.secret || 'blinkcat'

module.exports = function(app) {
    //添加中间件 
    app.use(compression())
    app.use(express.static(path.join(__dirname, '../build')))
    nunjucks.configure('app/view', {
        express: app
    })
    if (process.env.NODE_ENV == 'development') {
        var corsOptions = {
                origin: ['http://localhost:3000', 'http://192.168.1.101:3000'],
                credentials: true
            },
            cors = require('cors')
        app.use(cors(corsOptions))
    }
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
