import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import Link from 'react-router/lib/Link'

export default class TAvatar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { to, src, style } = this.props
        return (
            <Link to={to} style={style}>
				<Avatar src={src}></Avatar>
			</Link>
        )
    }
}

TAvatar.propTypes = {
    to: React.PropTypes.string,
    src: React.PropTypes.string,
    style: React.PropTypes.object
}
