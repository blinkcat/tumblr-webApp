import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUserInfo } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TAppBar from '../components/TAppBar'

class App extends Component {

    componentDidMount() {
        this.props.loadUserInfo()
        console.log(this.props)
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
              <TAppBar {...this.props.user}/>
            </div>
          </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { user = {} } = state
    return { user }
}

export default connect(mapStateToProps, {
    loadUserInfo
})(App)
