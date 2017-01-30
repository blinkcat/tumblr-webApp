const path = require('path'),
    wrap = require('co').wrap,
    ERROR_CODE = 500
let {
    isClientReady,
    createClient,
    getClient
} = require('../model/tumblr')

let client = null

exports.refresh = function() {
    client = getClient()
}

exports.index = function(req, res) {
    const { token, secret } = req.signedCookies
    if (!token || !secret) {
        res.redirect('/login')
    } else {
        if (!isClientReady()) {
            client = createClient({ token, secret })
        }
        if (process.env.NODE_ENV == 'development') {
            res.render('test.html')
        } else if (process.env.NODE_ENV == 'production') {
            res.redirect('/dashboard')
        } else {
            res.redirect('http://localhost:8080/')
        }
    }
}

exports.userInfo = wrap(function*(req, res) {
    try {
        var userInfo = yield client.userInfo()
    } catch (e) {
        console.error('userInfo', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(userInfo)
})

exports.dashboard = wrap(function*(req, res) {
    try {
        var dashboard = yield client.userDashboard(req.query)
    } catch (e) {
        console.error('dashboard', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(dashboard)
})

exports.userLikes = wrap(function*(req, res) {
    try {
        var userLikes = yield client.userLikes(req.query)
    } catch (e) {
        console.error('userLikes', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    // var temp = {}
    // temp.posts = userLikes.liked_posts
    // temp.count = userLikes.liked_count
    // res.json(temp)
    res.json(userLikes)
})

exports.userFollowing = wrap(function*(req, res) {
    try {
        var userFollowing = yield client.userFollowing(req.query)
    } catch (e) {
        console.error('userFollowing', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(userFollowing)
})

exports.likePost = wrap(function*(req, res) {
    try {
        const { id, reblogKey } = req.body
        console.log('body', req.body)
        if (!id || !reblogKey) {
            console.log('need id and reblogKey')
            res.status(ERROR_CODE).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield client.likePost(id, reblogKey)
        }
    } catch (e) {
        console.error('userLikes', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(result)
})

exports.unlikePost = wrap(function*(req, res) {
    try {
        const { id, reblogKey } = req.body
        console.log('body', req.body)
        if (!id || !reblogKey) {
            console.log('need id and reblogKey')
            res.status(ERROR_CODE).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield client.unlikePost(id, reblogKey)
        }
    } catch (e) {
        console.error('userLikes', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(result)
})
