import React, { Component } from 'react'
import { render } from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import muiThemeable from 'material-ui/styles/muiThemeable'
import '../sass/index.scss'

injectTapEventPlugin()

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
  				<AppBar title="my AppBar" />
  			</MuiThemeProvider>
        )
    }
}

render(
    <App />,
    document.getElementById('app')
)
