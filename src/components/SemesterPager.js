import React from 'react'
import { connect } from 'react-redux'
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'

const mapStateToProps=state=>({
    semesters:state.field.structure
})

class SemesterPagerX extends React.Component {
  render() {
    const pages = {}

    const Tabs = TabNavigator(pages)

    return Tabs()
  }
}

const SemesterPager = connect()(SemesterPagerX)

export { SemesterPager }
