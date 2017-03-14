import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { fetchLikes } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'
import { pageSize } from '../../config'

class Likes extends Component {
    constructor(props) {
        super(props)
        this.loadLikes = this.loadLikes.bind(this)
    }

    componentDidMount() {
        this.props.posts.length < pageSize && this.props.dispatch(fetchLikes())
    }

    loadLikes() {
        this.props.dispatch(fetchLikes())
    }

    static dispatchWork(store) {
        store.dispatch(fetchLikes())
    }

    render() {
        const { isFetching, posts,isOver } = this.props
        var dom = isFetching && posts.length == 0 ?
            <div style = {
                { textAlign: 'center', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }
            } >
                <CircularProgress size={60} thickness={7} /> 
            </div> : 
            <TList posts={posts} isFetching={isFetching} loadData={this.loadLikes} isOver={isOver}/>
            return (
                dom
            )
    }
}

const mapStateToProps = (state) => {
    const likes=state.pagination.likes
    return {
        posts: likes.liked_posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: likes.isFetching,
        isOver:likes.page*pageSize>=likes.liked_count
    }
}

Likes.propTypes = {
    isFetching: React.PropTypes.bool,
    posts: React.PropTypes.arrayOf(React.PropTypes.object),
    isOver:React.PropTypes.bool
}

export default connect(mapStateToProps)(Likes)
