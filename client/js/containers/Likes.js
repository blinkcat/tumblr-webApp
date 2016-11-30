import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { loadLikes } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'

class Likes extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.posts.length == 0 && this.props.loadLikes()
    }

    render() {
        const { isFetching, posts } = this.props
        var dom = isFetching && posts.length == 0 ? <div style={{textAlign:'center',position:'fixed',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}><CircularProgress size={60} thickness={7} /></div> : <TList posts={posts} isFetching={isFetching} loadData={this.props.loadLikes} />
        return (
            dom
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.pagination.likes.posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: state.pagination.likes.isFetching
    }
}

export default connect(mapStateToProps, {
    loadLikes
})(Likes)
