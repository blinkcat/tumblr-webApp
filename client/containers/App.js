import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo } from '../actions'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TAppBar from '../components/TAppBar'

class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchUserInfo())
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
              <TAppBar {...this.props.user}/>
              {this.props.children}
            </div>
          </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user = {} } = state
    return { user }
}

export default connect(mapStateToProps)(App)

App.propTypes = {
    user: React.PropTypes.object
}
