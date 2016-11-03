import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUserInfo } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import BottomNavigationExampleSimple from '../components/BottomNavigationExampleSimple'
import TabsExampleIcon from '../components/TabsExampleIcon'

class App extends Component {

    componentDidMount() {
        this.props.loadUserInfo()
        console.log(this.props)
    }

    render() {
        return (
            <MuiThemeProvider>
            	<div>
   					<AppBar title="tumblr" />
   					<BottomNavigationExampleSimple />
   					<TabsExampleIcon />
   				</div>
   			</MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

export default connect(mapStateToProps, {
    loadUserInfo
})(App)
