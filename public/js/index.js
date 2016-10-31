import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'

injectTapEventPlugin()

const MyAwesomeReactComponent = () => (
  <RaisedButton label="Default" />
)

const App = () => (
  <MuiThemeProvider>
    <MyAwesomeReactComponent />
  </MuiThemeProvider>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)