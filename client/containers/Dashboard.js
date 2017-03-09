import React, { Component } from 'react'
import { connect } from 'react-redux'
import TList from '../components/TList'
import { fetchDashBoard } from '../actions'
import CircularProgress from 'material-ui/CircularProgress'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.loadDashBoard = this.loadDashBoard.bind(this)
    }

    componentDidMount() {
        this.props.posts.length == 0 && this.props.dispatch(fetchDashBoard())
    }

    loadDashBoard() {
        this.props.dispatch(fetchDashBoard())
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
                <CircularProgress size={60} thickness={7} /> 
            </div> : <TList posts={posts} isFetching={isFetching} loadData={this.loadDashBoard} />
            return (
                dom
            )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.pagination.dashboard.posts.map((cur) => {
            return state.entities.posts[cur]
        }),
        isFetching: state.pagination.dashboard.isFetching
    }
}

Dashboard.propTypes = {
    isFetching: React.PropTypes.bool,
    posts: React.PropTypes.arrayOf(React.PropTypes.object)
}

export default connect(mapStateToProps)(Dashboard)
