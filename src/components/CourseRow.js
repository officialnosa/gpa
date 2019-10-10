import React from 'react'
import { connect } from 'react-redux'
import {
  TextInput,
  Button,
  Row,
  Title,
  FormGroup,
  Caption,
  Subtitle,
  TouchableOpacity,
  Divider
} from '@shoutem/ui'
import { Alert, Platform, View as RNView, View, StyleSheet } from 'react-native'
import { GradeIndicator } from './GradeIndicator'
import { editCourse, deregisterCourse, changeGrade } from '../redux/actions'
import { GradeSelector } from './GradeSelector'
import { runAsync } from '../utils'
import Icon from 'react-native-vector-icons/Entypo'
import { Stepper } from '../components/Stepper'
import Collapsible from 'react-native-collapsible'

const mapStateToProps = state => ({
  courses: state.courses,
  field: state.field
})

// const options = [
//   { grade: 'F', point: 0 },
//   { grade: 'E', point: 1 },
//   { grade: 'D', point: 2 },
//   { grade: 'C', point: 3 },
//   { grade: 'B', point: 4 },
//   { grade: 'A', point: 5 }
// ]

// const emptyOption = { point: 0, grade: '-' }
// const optionsWithEmptyOption = [emptyOption, ...options]

class CourseRowX extends React.Component {
  // state = {
  //   editingMode: false,
  //   grade: 0,
  //   title: '',
  //   credits: 0
  // }
  constructor(props) {
    super(props)
    const { courses, id } = props
    const grade = this.getScore(this.props)

    if (courses[id]) {
      this.state = {
        editingMode: false,
        grade,
        title: courses[id].name,
        credits: courses[id].creditLoad,
        code: courses[id].code
      }
    }
  }

  componentDidMount() {
    const { editingMode, grade, title, credits } = this.state

    if (editingMode || grade || title != 'Untitled Course' || credits) return
    else {
      runAsync(() =>
        this.setState({
          editingMode: true
        })
      )
    }
  }

  onChangeName = name =>
    this.setState({ title: name }, () =>
      runAsync(() =>
        this.props.dispatch(editCourse({ id: this.props.id, name }))
      )
    )

  onChangeCode = code =>
    this.setState({ code }, () =>
      runAsync(() =>
        this.props.dispatch(editCourse({ id: this.props.id, code }))
      )
    )

  onChangeCreditLoad = creditLoad =>
    this.setState({ credits: Number(creditLoad) }, () =>
      runAsync(() =>
        this.props.dispatch(
          editCourse({ id: this.props.id, creditLoad: Number(creditLoad) })
        )
      )
    )

  onChangeGrade = grade => {
    const { id, semester, year, dispatch } = this.props
    // this.toggleEditingMode()
    this.setState({ grade }, () =>
      runAsync(() => dispatch(changeGrade({ id, semester, year, grade })))
    )
  }

  deregisterCourse = () => {
    const { id, semester, year, dispatch } = this.props

    if (Platform.OS === 'web') {
      if (
        window.confirm(
          'Are you sure? You are about to delete this course. This cannot be undone'
        )
      ) {
        dispatch(deregisterCourse({ id, semester, year }))
      }
    } else
      Alert.alert(
        'Are you sure?',
        'You are about to delete this course. This cannot be undone.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {}
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              dispatch(deregisterCourse({ id, semester, year }))
            }
          }
        ]
      )
  }

  getScore = ({ field, semester, year, id }) =>
    field.structure[`${year}$${semester}`][id]

  toggleEditingMode = () =>
    this.setState(oldState => ({ editingMode: !oldState.editingMode }))

  _shouldComponentUpdate(
    { field: newField, courses: newCourses },
    { editingMode: newEditingMode }
  ) {
    const {
      id,
      year,
      semester,
      field: oldField,
      courses: oldCourses
    } = this.props

    const oldFieldCourses = oldField.structure[`${year}$${semester}`][id]
    const newFieldCourses = newField.structure[`${year}$${semester}`][id]

    return (
      oldFieldCourses !== newFieldCourses ||
      JSON.stringify(oldCourses[id]) !== JSON.stringify(newCourses[id]) ||
      this.state.editingMode !== newEditingMode
    )
  }
  shouldComponentUpdate(
    nextProps,
    {
      editingMode: newEditingMode,
      grade: newGrade,
      title: newTitle,
      code: newCode,
      credits: newCredit
    }
  ) {
    const {
      editingMode: oldEditingMode,
      grade: oldGrade,
      title: oldTitle,
      code: oldCode,
      credits: oldCredit
    } = this.state

    return (
      newEditingMode !== oldEditingMode ||
      newGrade !== oldGrade ||
      newTitle !== oldTitle ||
      newCode !== oldCode ||
      newCredit !== oldCredit
    )
  }

  renderNormalMode = ({ credits, code, grade, title }) => (
    <View style={styles.normalContainer}>
      <View style={styles.flex}>
        <Title>{title}</Title>
        <Caption>
          {code ? `${code} - ` : ''}credits: {credits}
        </Caption>
      </View>
      <GradeIndicator point={grade} />
      <View styleName="vertical" style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={this.deregisterCourse}>
          <Icon name="cross" size={25} color="#aaa" />
        </TouchableOpacity>
        <Icon
          name={this.state.editingMode ? 'chevron-up' : 'chevron-down'}
          style={{ marginTop: 20 }}
          size={25}
          color="#aaa"
        />
      </View>
    </View>
  )

  renderEditingMode = ({ credits, grade, title, code }) => (
    <RNView
      style={[
        styles.editorContainer,
        Platform.OS === 'web' && !this.state.editingMode && { display: 'none' }
      ]}
    >
      <FormGroup styleName="stretch">
        <Caption key="course">COURSE CODE</Caption>
        <TextInput
          placeholder="..."
          value={code}
          onChangeText={this.onChangeCode}
        />
        <Caption>COURSE TITLE</Caption>
        <TextInput
          placeholder="..."
          value={title}
          onChangeText={this.onChangeName}
        />
        <Divider styleName="line" />
      </FormGroup>
      <Row>
        <Subtitle styleName="flexible">CREDIT LOAD</Subtitle>
        <View>
          <Stepper
            label={credits === 1 ? ' Unit' : ' Units'}
            min={0}
            max={10}
            containerStyle={{
              justifyContent: 'flex-end'
            }}
            onValueChange={this.onChangeCreditLoad}
            initialValue={credits}
          />
        </View>
      </Row>
      <FormGroup styleName="stretch">
        <Caption style={{ textAlign: 'center' }}>GRADE</Caption>

        <View style={{ alignSelf: 'center' }}>
          <GradeSelector value={grade} onChangeValue={this.onChangeGrade} />
        </View>
      </FormGroup>
    </RNView>
  )

  render() {
    const { id, courses } = this.props
    const { editingMode } = this.state
    const course = courses[id]

    if (!course)
      return (
        <Row>
          <Title>NO DATA</Title>
        </Row>
      )

    // const score = this.getScore(this.props)
    // const selectedGrade = options[score] || { point: 0, grade: '-' }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleEditingMode}>
          {this.renderNormalMode(this.state)}
        </TouchableOpacity>
        {Platform.OS === 'web' ? (
          this.renderEditingMode(this.state)
        ) : (
          <Collapsible collapsed={!editingMode}>
            {this.renderEditingMode(this.state)}
          </Collapsible>
        )}
        {/* <GradeSelector /> */}
      </View>
    )
  }
}
const CourseRow = connect(mapStateToProps)(CourseRowX)
export { CourseRow }

const styles = StyleSheet.create({
  red: { color: '#f56' },
  blue: { color: '#05f' },
  editorContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: '#ffd20088'
  },
  normalContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row'
  },
  underline: { borderBottomWidth: 2, borderBottomColor: '#ddd' },
  container: {
    marginHorizontal: 10,
    marginBottom: 20,
    // padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    // elevation: 1,
    borderWidth: 2,
    borderColor: '#ffd20088'
  },
  flex: { flex: 1 }
})
