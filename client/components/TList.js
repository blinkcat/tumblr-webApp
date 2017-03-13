import React, { Component } from 'react'
import TCard from './TCard'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

export default class TList extends Component {
    constructor(props) {
        super(props)
    }

    getLoadMoreBtn() {
        var isOver = this.props.isOver
        if (isOver) {
            return <RaisedButton label="没有更多" fullWidth={true} />
        } else {
            return <RaisedButton label="加载更多" fullWidth={true} onClick={this.props.loadData} />
        }
    }

    render() {
        const outerStyle = this.props.outerStyle || { paddingTop: '66px' },
            style = this.props.style || { 'maxWidth': '540px', margin: '4px auto 10px' },
            posts = this.props.posts
        var btnDom = this.props.isFetching ? <CircularProgress /> :
            this.getLoadMoreBtn()
        return (
            <ul style={outerStyle}>
            {
                posts.map((post)=>{
                    return (
                        <li style={style} key={post.id}>
                            <TCard post={post}/>
                        </li>
                    )
                })
            }
            <li style={{ 'maxWidth': '540px', margin: '4px auto 10px' ,textAlign:'center'}} key={0}>
                {btnDom}
            </li>
            </ul>
        )
    }
}

TList.propTypes = {
    posts: React.PropTypes.array
}
