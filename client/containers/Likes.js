import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { loadLikes, fetchLikes } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'

class Likes extends Component {
    constructor(props) {
        super(props)
        this.loadLikes = this.loadLikes.bind(this)
    }

    componentDidMount() {
        this.props.posts.length == 0 && this.props.dispatch(fetchLikes())
    }

    loadLikes() {
        this.props.dispatch(fetchLikes())
    }

    render() {
        const { isFetching, posts } = this.props
        var dom = isFetching && posts.length == 0 ?
            <div style = {
                { textAlign: 'center', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }
            }>
                <CircularProgress size={60} thickness={7} /> 
            </div> : <TList posts={posts} isFetching={isFetching} loadData={this.loadLikes} />
            return (
                dom
            )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.pagination.likes.liked_posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: state.pagination.likes.isFetching
    }
}

Likes.propTypes = {
    isFetching: React.PropTypes.bool,
    posts: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default connect(mapStateToProps)(Likes)
