const OAuth = require('oauth').OAuth,
    { CONSUMERKEY, CONSUMERSECRET } = process.env,
    { callbackURL } = require('../../config'),
    // Request-token URL   https://www.tumblr.com/oauth/request_token
    // Authorize URL   https://www.tumblr.com/oauth/authorize
    // Access-token URL    https://www.tumblr.com/oauth/access_token
    // https://github.com/stigok/node-oauth-tumblr-example/blob/master/src/routes/oauth.js
    oa = new OAuth(
        'https://www.tumblr.com/oauth/request_token',
        'https://www.tumblr.com/oauth/access_token',
        CONSUMERKEY,
        CONSUMERSECRET,
        '1.0A',
        callbackURL,
        'HMAC-SHA1'
    )

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
            console.error(`getOAuthRequestToken ${err.message}`)
            next(err)
        } else {
            req.session.requestToken = token
            req.session.requestTokenSecret = secret
            res.redirect(`https://www.tumblr.com/oauth/authorize?oauth_token=${token}`)
        }
    })
}

exports.handleCb = function(req, res, next) {
    if (!req.session.requestToken || !req.session.requestTokenSecret) {
        console.error('missing session information')
        next(Error('missing session information'))
    } else {
        oa.getOAuthAccessToken(req.query.oauth_token, req.session.requestTokenSecret, req.query.oauth_verifier, function(err, token, secret) {
            if (err) {
                console.error('getOAuthAccessToken failed')
                next(Error('getOAuthAccessToken failed'))
            } else {
                res.cookie('token', token, { httpOnly: true, signed: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                res.cookie('secret', secret, { httpOnly: true, signed: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
                res.redirect('/')
            }
        })
    }
}
