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
    if (process.env.NODE_ENV == 'development') {
        var webpackMiddleware = require('webpack-dev-middleware'),
            webpack = require('webpack'),
            devConfig = {
                entry: './client/js/index.js',
                output: {
                    filename: 'bundle.js',
                    path: __dirname
                },
                module: {
                    noParse: [path.join(nodeModulesPath, '/react/dist/react')],
                    loaders: [{
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        query: {
                            presets: ['react', 'es2015']
                        }
                    }, {
                        test: /\.css$/,
                        loader: 'style!css?sourceMap'
                    }, {
                        test: /\.scss$/,
                        loader: 'style!css?sourceMap!sass?sourceMap'
                    }, {
                        test: /\.(gif|jpg|png|woff2|eot)\??.*$/,
                        loader: 'url?limit=3072'
                    }]
                },
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify('development')
                    }),
                    new webpack.optimize.OccurrenceOrderPlugin(),
                    new webpack.HotModuleReplacementPlugin()
                ],
                devtool: 'cheap-module-eval-source-map'
            },
            app.use(webpackMiddleware(webpack(devConfig), {
                serverSideRender: true
            }))
    }
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
