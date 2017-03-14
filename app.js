require('babel-polyfill')
require('babel-register')({
    presets: [
        'es2015',
        'react'
    ]
})
require('dotenv').config()

const express = require('express'),
    app = express(),
    port = 8080

require('./config/express')(app)
require('./config/route')(app)

app.listen(port, function() {
    console.log(`app is listening on port ${port}`)
})
