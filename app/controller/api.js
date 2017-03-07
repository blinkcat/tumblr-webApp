/**
 * 获取tumblr数据，提供接口
 */

const path = require('path'),
    wrap = require('co').wrap,
    debug = require('debug')('tumblrWebApp:api'),
    ERROR_CODE = 500

/**
 * 通过co.wrap，将generator转成普通函数
 */
exports.userInfo = wrap(function*(req, res) {
    debug('userInfo')
    try {
        var userInfo = yield res.client.userInfo()
    } catch (e) {
        debug('userInfo %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(userInfo)
})

exports.dashboard = wrap(function*(req, res) {
    debug('dashboard')
    try {
        var dashboard = yield res.client.userDashboard(req.query)
    } catch (e) {
        debug('dashboard %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(dashboard)
})

exports.userLikes = wrap(function*(req, res) {
    debug('userLikes')
    try {
        var userLikes = yield res.client.userLikes(req.query)
    } catch (e) {
        debug('userLikes %o', e)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(userLikes)
})

exports.userFollowing = wrap(function*(req, res) {
    debug('userFollowing')
    try {
        var userFollowing = yield res.client.userFollowing(req.query)
    } catch (e) {
        debug('userFollowing %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(userFollowing)
})

exports.likePost = wrap(function*(req, res) {
    debug('likePost')
    try {
        const { id, reblogKey } = req.body
        if (!id || !reblogKey) {
            res.status(ERROR_CODE).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield res.client.likePost(id, reblogKey)
        }
    } catch (e) {
        debug('likePost %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(result)
})

exports.unlikePost = wrap(function*(req, res) {
    debug('unlikePost')
    try {
        const { id, reblogKey } = req.body
        if (!id || !reblogKey) {
            debug('unlikePost %s', 'need id and reblogKey')
            res.status(ERROR_CODE).json({ error: true, message: 'need id and reblogKey' })
        } else {
            var result = yield res.client.unlikePost(id, reblogKey)
        }
    } catch (e) {
        debug('unlikePost %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
    res.json(result)
})

//获取blog的post
exports.blogPosts = wrap(function*(req, res) {
    debug('blogPosts')
    try {
        res.json(yield res.client.blogPosts(req.query.blog_name, req.query))
    } catch (e) {
        debug('blogPosts %s', e.message)
        res.status(ERROR_CODE).json({ error: true, message: e.message })
    }
})
