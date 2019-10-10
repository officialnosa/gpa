import React from 'react'
import { Toolbar as OldToolbar } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class ToolbarX extends React.Component {
  render() {
    return (
      <OldToolbar
        // leftElement={this.props.showNavIcon}
        onLeftElementPress={this.props.navigation.goBack}
        centerElement={this.props.title}
        // rightElement={this.props.loggedIn ? 'person' : 'menu'}
        // onRightElementPress={() =>
        //   this.props.navigation.navigate('DrawerToggle')
        // }
        {...this.props}
      />
    )
  }
}

const Toolbar = withNavigation(
  connect(state => ({
    loggedIn: state.user.loggedIn
  }))(ToolbarX)
)
export { Toolbar }
