import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import Avatar from 'material-ui/Avatar'
import { fetchBlogPosts, changeAppBar } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'
import { AppBarStyle } from '../util'
import { pageSize } from '../../config'

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

    componentWillUnmount() {
        this.props.dispatch(changeAppBar(AppBarStyle.COMMON_STYLE))
    }

    loadBlogPosts() {
        this.props.dispatch(fetchBlogPosts({ blog_name: this.blog_name }))
    }

    static dispatchWork(store, renderProps) {
        store.dispatch(changeAppBar(AppBarStyle.BLOG_STYLE))
        return store.dispatch(fetchBlogPosts({ blog_name: renderProps.params.blog_name }))
    }

    render() {
        const { isFetching, posts, blog = {},isOver } = this.props
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
                <CircularProgress size={60} thickness={7} /> 
            </div> :   
            <div> 
                <div className = 'blog-info'
                    style = {   
                        { marginTop: '66px', 'paddingTop': '138px' }
                    } >
                    <div className='bg' style={{backgroundImage:`url(https://api.tumblr.com/v2/blog/${blog.name}.tumblr.com/avatar?size=512)`}}></div> 
                    <Avatar src = { `https://api.tumblr.com/v2/blog/${blog.name}.tumblr.com/avatar?size=96` } size = { 86 }
                        style = {
                            { boxShadow: '0 0 0 3px #FFFFFF' }
                        } >
                    </Avatar> 
                    <h1> { blog.title } </h1> 
                    <p> { blog.description } </p> 
                </div> 
                <TList posts = { posts }
                    isFetching = { isFetching }
                    loadData = { this.loadBlogPosts }
                    isOver={isOver}
                    outerStyle = {
                        {}
                    }
                />  
            </div>
        return (
            dom
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const blog = state.blogs[ownProps.routeParams.blog_name],
        posts = !blog ? [] : blog.posts,
        blogInfo = state.entities.blogs[ownProps.routeParams.blog_name]

    return {
        posts: posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        blog: blogInfo,
        isFetching: blog ? blog.isFetching : false,
        isOver:blog ? blog.page*pageSize>=blog.total_posts : false 
    }
}

export default connect(mapStateToProps)(Blog)
