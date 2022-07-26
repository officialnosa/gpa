import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Platform, StyleSheet, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@expo/vector-icons/Entypo'
import { Divider } from '@shoutem/ui/components/Divider'
import { FormGroup } from '@shoutem/ui/components/FormGroup'
import { Row } from '@shoutem/ui/components/Row'
import { Caption, Subtitle, Title } from '@shoutem/ui/components/Text'
import { TextInput } from '@shoutem/ui/components/TextInput'
import { TouchableOpacity } from '@shoutem/ui/components/TouchableOpacity'

import { Stepper } from '../components/Stepper'
import { changeGrade, deregisterCourse, editCourse } from '../redux/actions'
import { GradeIndicator } from './GradeIndicator'
import { GradeSelector } from './GradeSelector'

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

function useReduxState(initialState, action, delay = 100) {
  const [state, setState] = useState(initialState)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    const handle = setTimeout(() => {
      action(state)
    }, delay)

    return () => {
      clearTimeout(handle)
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  return [state, setState]
}

export function CourseRow({ semester, year, id }) {
  const { course, initialGrade } = useSelector((state) => ({
    course: state.courses[id],
    // field: state.field,
    initialGrade: state.field.structure[`${year}$${semester}`][id],
  }))
  // const store = useStore()
  // const { course, initialGrade } = useMemo(() => {
  //   const state = store.getState()

  //   return {
  //     course: state.courses[id],
  //     // field: state.field,
  //     initialGrade: state.field.structure[`${year}$${semester}`][id],
  //   }
  // }, [])

  const dispatch = useDispatch()
  const [editingMode, setEditingMode] = useState(false)

  const [title, setTitle] = useReduxState(course?.name, (name) =>
    dispatch(editCourse({ id: id, name }))
  )

  const [credits, setCredits] = useReduxState(
    course?.creditLoad,
    (creditLoad) =>
      dispatch(editCourse({ id: id, creditLoad: Number(creditLoad) }))
  )

  const [code, setCode] = useReduxState(course?.code, (code) =>
    dispatch(editCourse({ id: id, code }))
  )

  const [grade, setGrade] = useReduxState(initialGrade, (grade) =>
    dispatch(changeGrade({ id, semester, year, grade }))
  )

  useEffect(() => {
    if (editingMode || grade || title != 'Untitled Course' || credits) return
    else {
      setEditingMode(true)
    }
  }, [editingMode, grade, title, credits])

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
  }, [dispatch, id, semester, year])

  const toggleEditingMode = useCallback(
    () => setEditingMode((value) => !value),
    []
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
    <View
      style={[
        styles.editorContainer,
        Platform.OS === 'web' && !editingMode && { display: 'none' },
      ]}
    >
      <FormGroup styleName="stretch">
        <Caption key="course">COURSE CODE</Caption>
        <TextInput placeholder="..." value={code} onChangeText={setCode} />
        <Caption>COURSE TITLE</Caption>
        <TextInput placeholder="..." value={title} onChangeText={setTitle} />
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
            onValueChange={setCredits}
            initialValue={credits}
          />
        </View>
      </Row>
      <FormGroup styleName="stretch">
        <Caption style={{ textAlign: 'center' }}>GRADE</Caption>

        <View style={{ alignSelf: 'center' }}>
          <GradeSelector value={grade} onChangeValue={setGrade} />
        </View>
      </FormGroup>
    </View>
  )

  if (!course) {
    return (
      <Row>
        <Title>NO DATA</Title>
      </Row>
    )
  }

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
