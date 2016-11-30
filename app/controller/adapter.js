/**
 *@file OAUTH 和 api
 */

const path = require('path'),
    tumblr = require('tumblr.js'),
    co = require('co'),
    wrap = co.wrap,
    ConsumerKey = process.env.ConsumerKey,
    ConsumerSecret = process.env.ConsumerSecret,
    callbackURL = process.env.callbackURL || '',
    OAuth = require('oauth').OAuth
    // client = tumblr.createClient({
    //     consumer_key: ConsumerKey,
    //     consumer_secret: ConsumerSecret,
    //     token: '',
    //     token_secret: ''
    // })

// Request-token URL   https://www.tumblr.com/oauth/request_token
// Authorize URL   https://www.tumblr.com/oauth/authorize
// Access-token URL    https://www.tumblr.com/oauth/access_token
// https://github.com/stigok/node-oauth-tumblr-example/blob/master/src/routes/oauth.js

var oa = new OAuth(
        'https://www.tumblr.com/oauth/request_token',
        'https://www.tumblr.com/oauth/access_token',
        ConsumerKey,
        ConsumerSecret,
        '1.0A',
        callbackURL,
        'HMAC-SHA1'
    ),
    client = null

function isClientOK() {
    return !!client
}

function createClient({ token, secret }) {
    client = tumblr.createClient({
        credentials: {
            consumer_key: ConsumerKey,
            consumer_secret: ConsumerSecret,
            token,
            token_secret: secret
        },
        returnPromises: true
    })
}
exports.isClientOK = isClientOK

exports.createClient = createClient

/**
 * host
 * 66.6.33.193 tumblr.com
 * 66.6.32.4   tumblr.co
 * 66.6.32.4   api.tumblr.com
 * 66.6.32.4   www.tumblr.com
 */
exports.login = function(req, res, next) {
    oa.getOAuthRequestToken(function(err, token, secret) {
        if (err) {
            next(err)
        } else {
            console.log(`token: ${token} | secret: ${secret}`)
            req.session.requestToken = token
            req.session.requestTokenSecret = secret
                // res.set('Content-Type', 'text/html')
                // res.status(200).send(`<a href='https://www.tumblr.com/oauth/authorize?oauth_token=${token}'>login tumblr</a>`)

            res.redirect(`https://www.tumblr.com/oauth/authorize?oauth_token=${token}`)
        }
    })
}

exports.handleCb = function(req, res, next) {
    console.log(`oauth_token: ${req.query.oauth_token} | oauth_verifier: ${req.query.oauth_verifier}`)
    console.log(`session token: ${req.session.requestToken} | session secret: ${req.session.requestTokenSecret}`)
    if (!req.session.requestToken || !req.session.requestTokenSecret) {
        next(Error('missing session information'))
    } else {
        oa.getOAuthAccessToken(req.query.oauth_token, req.session.requestTokenSecret, req.query.oauth_verifier, function(err, token, secret) {
            if (err) {
                next(Error('getOAuthAccessToken failed'))
            } else {
                req.session.token = token
                req.secret.secret = secret
                res.cookie('token', token, { httpOnly: true, signed: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                res.cookie('secret', secret, { httpOnly: true, signed: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                res.redirect('/')
            }
        })
    }
}

exports.index = function(req, res) {
    const { token, secret } = req.signedCookies
    if (!token || !secret) {
        res.redirect('/login')
    } else {
        if (!isClientOK()) {
            createClient({ token, secret })
        }
        if (process.env.NODE_ENV == 'development') {
            res.redirect('http://localhost:3000/')
        } else if (process.env.NODE_ENV == 'production') {
            res.redirect('/dashboard')
        } else {
            res.redirect('http://localhost:8080/')
        }
    }
}

exports.client = client

exports.userInfo = wrap(function*(req, res) {
    try {
        var userInfo = yield client.userInfo()
    } catch (e) {
        console.log('userInfo', e.message)
        res.status(500).json({ error: true, message: e.message })
    }
    res.json(userInfo)
})

exports.dashboard = wrap(function*(req, res) {
    try {
        var dashboard = yield client.userDashboard(req.query)
    } catch (e) {
        console.log('dashboard', e.message)
        res.status(500).json({ error: true, message: e.message })
    }
    res.json(dashboard)
})

exports.userLikes = wrap(function*(req, res) {
    try {
        var userLikes = yield client.userLikes(req.query)
    } catch (e) {
        console.log('userLikes', e.message)
        res.status(500).json({ error: true, message: e.message })
    }
    var temp = {}
    temp.posts = userLikes.liked_posts
    temp.count = userLikes.liked_count
    res.json(temp)
})

exports.likePost = wrap(function*(req, res) {
    try {
        const { id, reblogKey } = req.body
        console.log('body', req.body)
        if (!id || !reblogKey) {
            console.log('need id and reblogKey')
            res.status(500).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield client.likePost(id, reblogKey)
        }
    } catch (e) {
        console.log('userLikes', e.message)
        res.status(500).json({ error: true, message: e.message })
    }
    res.json(result)
})

exports.unlikePost = wrap(function*(req, res) {
    try {
        const { id, reblogKey } = req.body
        console.log('body', req.body)
        if (!id || !reblogKey) {
            console.log('need id and reblogKey')
            res.status(500).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield client.unlikePost(id, reblogKey)
        }
    } catch (e) {
        console.log('userLikes', e.message)
        res.status(500).json({ error: true, message: e.message })
    }
    res.json(result)
})
