import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { fetchBlogPosts, changeAppBar } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'
import { AppBarStyle } from '../util'

class Blog extends Component {
    constructor(props) {
        super(props)
        this.loadBlogPosts = this.loadBlogPosts.bind(this)
    }

    componentDidMount() {
        this.blog_name = this.props.routeParams.blog_name
        this.props.posts.length == 0 && this.props.dispatch(fetchBlogPosts({ blog_name: this.blog_name }))
        this.props.dispatch(changeAppBar(AppBarStyle.BLOG_STYLE))
    }

    componentWillUnmount(){
        this.props.dispatch(changeAppBar(AppBarStyle.COMMON_STYLE))
    }

    loadBlogPosts() {
        this.props.dispatch(fetchBlogPosts({ blog_name: this.blog_name }))
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
            } >
            <CircularProgress size={60} thickness={7} /> </div> : <TList posts={posts} isFetching={isFetching} loadData={this.loadBlogPosts} />
            return (
                dom
            )
    }
}

const mapStateToProps = (state, ownProps) => {
    const blog = state.blogs[ownProps.routeParams.blog_name],
        posts = !blog ? [] : blog.posts

    return {
        posts: posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: blog ? blog.isFetching : false
    }
}

export default connect(mapStateToProps)(Blog)
