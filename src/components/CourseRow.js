import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import { TextInput } from '@shoutem/ui/components/TextInput'
import { Button } from '@shoutem/ui/components/Button'
import { Row } from '@shoutem/ui/components/Row'
import { Title, Subtitle, Caption } from '@shoutem/ui/components/Text'
import { FormGroup } from '@shoutem/ui/components/FormGroup'
import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity'
import { Divider } from '@shoutem/ui/components/Divider'

import { Alert, Platform, View as RNView, View, StyleSheet } from 'react-native'
import { GradeIndicator } from './GradeIndicator'
import { editCourse, deregisterCourse, changeGrade } from '../redux/actions'
import { GradeSelector } from './GradeSelector'
import { runAsync } from '../utils'
import Icon from 'react-native-vector-icons/Entypo'
import { Stepper } from '../components/Stepper'
import Collapsible from 'react-native-collapsible'

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

export function CourseRow({ semester, year, id }) {
  const { course, grade } = useSelector((state) => ({
    course: state.courses[id],
    // field: state.field,
    grade: state.field.structure[`${year}$${semester}`][id],
  }))

  const dispatch = useDispatch()
  const [editingMode, setEditingMode] = useState(false)
  const [title, setTitle] = useState(course?.name)
  const [credits, setCredits] = useState(course?.creditLoad)
  const [code, setCode] = useState(course?.code)

  // const grade = useMemo(() => field.structure[`${year}$${semester}`][id], [
  //   field,
  //   semester,
  //   year,
  //   id,
  // ])

  useEffect(() => {
    if (editingMode || grade || title != 'Untitled Course' || credits) return
    else {
      setEditingMode(true)
    }
  }, [editingMode, grade, title, credits])

  const onChangeName = useCallback(
    (name) => {
      setTitle(name)
      dispatch(editCourse({ id: id, name }))
    },
    [id]
  )

  const onChangeCode = useCallback(
    (code) => {
      setCode(code)
      dispatch(editCourse({ id: id, code }))
    },
    [id]
  )

  const onChangeCreditLoad = useCallback((creditLoad) => {
    setCredits(Number(creditLoad))

    dispatch(editCourse({ id: id, creditLoad: Number(creditLoad) }))
  })

  const onChangeGrade = useCallback(
    (grade) => {
      // toggleEditingMode()
      // setGrade(grade)
      dispatch(changeGrade({ id, semester, year, grade }))
    },
    [id, semester, year, dispatch]
  )

  const tryDeregisterCourse = useCallback(() => {
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
            onPress: () => {},
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              dispatch(deregisterCourse({ id, semester, year }))
            },
          },
        ]
      )
  }, [id, semester, year])

  const toggleEditingMode = useCallback(
    () => setEditingMode((editingMode) => !editingMode),
    [editingMode]
  )

  const renderNormalMode = () => (
    <View style={styles.normalContainer}>
      <View style={styles.flex}>
        <Title>{title}</Title>
        <Caption>
          {code ? `${code} - ` : ''}credits: {credits}
        </Caption>
      </View>
      <GradeIndicator point={grade} />
      <View styleName="vertical" style={{ marginLeft: 10 }}>
        <TouchableOpacity onPress={tryDeregisterCourse}>
          <Icon name="cross" size={25} color="#aaa" />
        </TouchableOpacity>
        <Icon
          name={editingMode ? 'chevron-up' : 'chevron-down'}
          style={{ marginTop: 20 }}
          size={25}
          color="#aaa"
        />
      </View>
    </View>
  )

  const renderEditingMode = () => (
    <RNView
      style={[
        styles.editorContainer,
        Platform.OS === 'web' && !editingMode && { display: 'none' },
      ]}
    >
      <FormGroup styleName="stretch">
        <Caption key="course">COURSE CODE</Caption>
        <TextInput placeholder="..." value={code} onChangeText={onChangeCode} />
        <Caption>COURSE TITLE</Caption>
        <TextInput
          placeholder="..."
          value={title}
          onChangeText={onChangeName}
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
              justifyContent: 'flex-end',
            }}
            onValueChange={onChangeCreditLoad}
            initialValue={credits}
          />
        </View>
      </Row>
      <FormGroup styleName="stretch">
        <Caption style={{ textAlign: 'center' }}>GRADE</Caption>

        <View style={{ alignSelf: 'center' }}>
          <GradeSelector value={grade} onChangeValue={onChangeGrade} />
        </View>
      </FormGroup>
    </RNView>
  )

  if (!course)
    return (
      <Row>
        <Title>NO DATA</Title>
      </Row>
    )

  // const score = getScore(props)
  // const selectedGrade = options[score] || { point: 0, grade: '-' }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleEditingMode}>
        {renderNormalMode()}
      </TouchableOpacity>
      {Platform.OS === 'web' ? (
        renderEditingMode()
      ) : (
        <Collapsible collapsed={!editingMode}>
          {renderEditingMode()}
        </Collapsible>
      )}
      {/* <GradeSelector /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  red: { color: '#f56' },
  blue: { color: '#05f' },
  editorContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderTopWidth: 2,
    borderTopColor: '#ffd20088',
  },
  normalContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
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
    borderColor: '#ffd20088',
  },
  flex: { flex: 1 },
})
