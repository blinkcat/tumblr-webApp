import IconButton from 'material-ui/IconButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import { red900 } from 'material-ui/styles/colors'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../actions'

class LikeButton extends Component {
    constructor(props) {
        super(props)
        this.state = { liked: this.props.defaultLiked }
        this.like = this.like.bind(this)
        this.unlike = this.unlike.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    getDom() {
        return this.state.liked ? <ActionFavorite color={red900}/> : <ActionFavoriteBorder />
    }

    like() {
        this.setState({ liked: true })
    }

    unlike() {
        this.setState({ liked: false })
    }

    doLike() {
        const { id, reblogKey } = this.props
        if (!id || !reblogKey) {
            return
        }
        likePost({ id, reblogKey, dispatch: this.props.dispatch, cb: this.like })
    }

    dounLike() {
        const { id, reblogKey } = this.props
        if (!id || !reblogKey) {
            return
        }
        unlikePost({ id, reblogKey, dispatch: this.props.dispatch, cb: this.like })
    }

    toggle() {
        if (this.state.liked) {
            this.dounLike()
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

export default connect()(LikeButton)
