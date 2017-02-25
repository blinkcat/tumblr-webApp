import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { loadBlogPosts } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'

class TBlog extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.posts.length == 0 && this.props.loadBlogPosts()
    }

    render() {
        const { isFetching, posts } = this.props
        var dom = isFetching && posts.length == 0 ?
            <div style = {
                {
                    textAlign: 'center',
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)'
                }
            }> 
                <CircularProgress size={60} thickness={7} /> 
            </div> : <TList posts={posts} isFetching={isFetching} loadData={this.props.loadDashBoard} / >
            return (
                <div></div>
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.pagination.dashboard.posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: state.pagination.dashboard.isFetching
    }
}

export default connect(mapStateToProps, {
    loadBlogPosts
})(TBlog)
