import React from 'react'
import { Icon, View, Title } from '@shoutem/ui'
import { CourseRow } from '../components/CourseRow'
import { SemesterCourseList } from '../components/SemesterCourseList'

export class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon name="home" size={focused ? 25 : 23} color={tintColor} />
    )
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View styleName="flexible light">
        <View
          style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff' }}
        >
          <Title>Benson Idahosa University</Title>
        </View>
        {/* <CourseRow id="biu$csc$411" year={4} semester={1} /> */}
        {/* <CourseRow id="biu$csc$412" year={4} semester={1} /> */}
        <SemesterCourseList year={4} semester={1} />
      </View>
    )
  }
}
