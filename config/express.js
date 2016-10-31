const express = require('express'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    secret = process.env.secret || 'blinkcat'

module.exports = function(app) {
    //添加中间件 
    if (process.env.NODE_ENV == 'development') {
        var corsOptions = {
                origin: 'http://localhost:3000'
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

    app.use(function(err, req, res, next) {
        console.log('err', err)
        res.status(500).send('test').end()
    })
}
