import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TextInput,
  Button,
  Icon,
  Row,
  Title,
  FormGroup,
  Caption,
  DropDownMenu
} from '@shoutem/ui'
import { GradeIndicator } from './GradeIndicator'

const mapStateToProps = state => ({
  courses: state.courses,
  field: state.field
})

const options = [
  { grade: 'A', point: 5 },
  { grade: 'B', point: 4 },
  { grade: 'C', point: 3 },
  { grade: 'D', point: 2 },
  { grade: 'E', point: 1 },
  { grade: 'F', point: 0 }
]

const emptyOption = { id: '', name: 'Select' }
const optionsWithEmptyOption = [emptyOption, ...options]

class CourseRowX extends React.PureComponent {
  constructor(props) {
    super(props)
    const score = this.getScore(props)

    // if(score>)

    this.state = {
      selectedGrade: emptyOption
    }
  }
  getScore = ({ field, semester, year, id }) =>
    field.structure[`${year}$${semester}`][id]
  render() {
    const { id, courses, semester, year, field } = this.props
    const course = courses[id]
    if (!course)
      return (
        <Row>
          <Title>NO DATA</Title>
        </Row>
      )

    const score = this.getScore(this.props)
    const { selectedGrade } = this.state
    return (
      <Row>
        <View styleName="vertical">
          {/* <View styleName="horizontal"> */}
          <FormGroup styleName="stretch">
            {/* <Caption>COURSE TITLE</Caption> */}
            <TextInput placeholder="..." value={course.name} />
          </FormGroup>
          {/* <FormGroup styleName="">
            <Caption>Remove</Caption>
          </FormGroup> */}
          {/* <Caption>GRADE</Caption> */}
          {/* <DropDownMenu
              styleName={selectedGrade.point >= 0 ? '' : 'empty'}
              options={optionsWithEmptyOption}
              selectedOption={selectedGrade}
              onOptionSelected={option =>
                this.setState({ selectedGrade: option })
              }
              titleProperty={'grade'}
              valueProperty={'point'}
            /> */}
          {/* </View> */}
        </View>
        <GradeIndicator point={score} />
      </Row>
    )
  }
}
const CourseRow = connect(mapStateToProps)(CourseRowX)
export { CourseRow }
