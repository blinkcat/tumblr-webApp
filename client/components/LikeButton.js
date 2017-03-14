import IconButton from 'material-ui/IconButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import { red900 } from 'material-ui/styles/colors'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleLike } from '../actions'
import { api } from '../util'

class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = { liked: this.props.defaultLiked, isFetching: false }
        this.like = this.like.bind(this)
        this.unlike = this.unlike.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    getDom() {
        return this.state.liked ? <ActionFavorite color={red900}/> : <ActionFavoriteBorder />
    }

    like(id) {
        this.setState({ liked: true, isFetching: false })
        this.props.dispatch(toggleLike(id, true))
    }

    likePost({ id, reblogKey }) {
        var _this = this
        fetch(api.likePost.path, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ id, reblogKey })
        }).then((res) => {
            if (res.status == 200) {
                _this.like(id)
            } else {
                _this.setState({ isFetching: false })
            }
        }).catch(e => {
            console.log(e.message)
        })
    }

    unlike(id) {
        this.setState({ liked: false, isFetching: false })
        this.props.dispatch(toggleLike(id, false))
    }

    unlikePost({ id, reblogKey }) {
        var _this = this
        fetch(api.unlikePost.path, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ id, reblogKey })
        }).then((res) => {
            if (res.status == 200) {
                _this.unlike(id)
            } else {
                _this.setState({ isFetching: false })
            }
        }).catch(e => {
            console.log(e.message)
        })
    }

    doLike() {
        const { id, reblogKey } = this.props
        if (!id || !reblogKey) {
            return
        }
        this.likePost({ id, reblogKey })
    }

    doUnLike() {
        const { id, reblogKey } = this.props
        if (!id || !reblogKey) {
            return
        }
        this.unlikePost({ id, reblogKey })
    }

    toggle() {
        if (this.state.isFetching) {
            return false
        }
        this.setState({ isFetching: true })
        if (this.state.liked) {
            this.doUnLike()
        } else {
            this.doLike()
        }
    }

    render() {
        return (
            <IconButton tooltip={this.props.tooltip} style={this.props.style} onClick={this.toggle}>
                {this.getDom()}
            </IconButton>
        )
    }
}

//只注入 dispatch，不监听 store
export default connect()(LikeButton)
