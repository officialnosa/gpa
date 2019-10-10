import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user
})

class EmptyScreenX extends React.Component {
  static navigationOptions = {
    title: 'Hello'
  }
  componentWillMount() {
    const { user } = this.props
    if (!user.hasSchool) this.openWelcome()
    else if (!user.hasField) this.openWelcome()
    else this.openHome()
  }
  openHome() {
    this.navigate('Tabs')
  }
  openWelcome() {
    this.navigate('Welcome')
  }
  openFieldSelect() {
    this.navigate('ChooseField')
  }
  navigate(routeName) {
    this.props.navigation.navigate(routeName)
  }
  render() {
    return null
  }
}

const EmptyScreen = connect(mapStateToProps)(EmptyScreenX)

export { EmptyScreen }
