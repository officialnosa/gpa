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
  DropDownMenu,
  TouchableOpacity
} from '@shoutem/ui'
import { GradeIndicator } from './GradeIndicator'
import { editCourse, deregisterCourse, changeGrade } from '../redux/actions'
import Collapsible from 'react-native-collapsible'

const mapStateToProps = state => ({
  courses: state.courses,
  field: state.field
})

const options = [
  { grade: 'F', point: 0 },
  { grade: 'E', point: 1 },
  { grade: 'D', point: 2 },
  { grade: 'C', point: 3 },
  { grade: 'B', point: 4 },
  { grade: 'A', point: 5 }
]

// const emptyOption = { point: 0, grade: '-' }
// const optionsWithEmptyOption = [emptyOption, ...options]

class CourseRowX extends React.Component {
  state = {
    editingMode: false
  }

  onChangeName = name =>
    this.props.dispatch(editCourse({ id: this.props.id, name }))

  onChangeCreditLoad = creditLoad =>
    this.props.dispatch(
      editCourse({ id: this.props.id, creditLoad: Number(creditLoad) })
    )

  onChangeGrade = grade => {
    const { id, semester, year, dispatch } = this.props

    dispatch(changeGrade({ id, semester, year, grade: grade.point }))
  }

  deregisterCourse = () => {
    const { id, semester, year, dispatch } = this.props

    dispatch(deregisterCourse({ id, semester, year }))
  }

  getScore = ({ field, semester, year, id }) =>
    field.structure[`${year}$${semester}`][id]

  toggleEditingMode = () =>
    this.setState(oldState => ({ editingMode: !oldState.editingMode }))

  renderNormalMode = ({
    id,
    courses,
    semester,
    year,
    field,
    course,
    score,
    selectedGrade
  }) => (
    <View
      styleName="horizontal"
      style={{
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10
      }}
    >
      <View styleName="vertical flexible">
        <Title>{course.name}</Title>
        <Caption>credits: {course.creditLoad}</Caption>
      </View>
      <GradeIndicator point={score} />
    </View>
  )

  renderEditingMode = ({
    id,
    courses,
    semester,
    year,
    field,
    course,
    score,
    selectedGrade
  }) => (
    <View
      styleName="horizontal"
      style={{
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10
      }}
    >
      <View styleName="vertical flexible">
        {/* <View styleName="horizontal"> */}
        <FormGroup styleName="stretch">
          <Caption>COURSE TITLE</Caption>
          <TextInput
            placeholder="..."
            value={course.name}
            onChangeText={this.onChangeName}
          />
        </FormGroup>
        <View styleName="horizontal">
          <FormGroup styleName="">
            <Caption>CREDIT LOAD</Caption>
            <TextInput
              placeholder="..."
              value={String(course.creditLoad)}
              onChangeText={this.onChangeCreditLoad}
            />
          </FormGroup>
          <FormGroup styleName="">
            <Caption>GRADE</Caption>
            <DropDownMenu
              styleName={selectedGrade.point >= 0 ? '' : 'empty'}
              options={options}
              selectedOption={selectedGrade}
              onOptionSelected={this.onChangeGrade}
              titleProperty={'grade'}
              valueProperty={'point'}
            />
          </FormGroup>
        </View>
        <FormGroup styleName="horizontal" style={{ marginRight: 15 }}>
          <View styleName="flexible" />
          <Button onPress={this.deregisterCourse}>
            <Caption style={styles.red}>Remove</Caption>
          </Button>

          <Button onPress={this.toggleEditingMode}>
            <Caption style={styles.blue}>Done</Caption>
          </Button>
        </FormGroup>
        {/* </View> */}
      </View>
    </View>
  )

  render() {
    const { id, courses, semester, year, field } = this.props
    const { editingMode } = this.state
    const course = courses[id]

    if (!course)
      return (
        <Row>
          <Title>NO DATA</Title>
        </Row>
      )

    const score = this.getScore(this.props)
    const selectedGrade = options[score] || { point: 0, grade: '-' }

    return (
      <View
        styleName="horizontal"
        style={{
          margin: 15,
          // padding: 10,
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 1
        }}
      >
        <View styleName="vertical flexible">
          <Collapsible collapsed={editingMode}>
            <TouchableOpacity onPress={this.toggleEditingMode}>
              {this.renderNormalMode({
                ...this.props,
                course,
                score,
                selectedGrade
              })}
            </TouchableOpacity>
          </Collapsible>
          <Collapsible collapsed={!editingMode}>
            {this.renderEditingMode({
              ...this.props,
              course,
              score,
              selectedGrade
            })}
          </Collapsible>
        </View>
      </View>
    )
  }
}
const CourseRow = connect(mapStateToProps)(CourseRowX)
export { CourseRow }

const styles = {
  red: { color: '#f56' },
  blue: { color: '#05f' }
}
