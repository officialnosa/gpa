import { Database } from './../lib/Database'
import { ISessionDetails } from './../interfaces/ISessionDetails'
import { IApiResponse, IApiData } from './../lib/request'

import * as React from 'react'
import { get } from './../lib/request'
import { ApiService, API } from './../services/ApiService'
import Modal from 'antd/lib/modal'
import { useState, useContext, useEffect } from 'react'
import { LoginRequired } from '../views/session/LoginRequired'
import { AuthModal } from '../views/session/AuthModal'
import Loading from '../components/Loading'
import { IViewer } from '../interfaces/IViewer'

export const ViewerContext = React.createContext({})

interface IViewerProps {
  viewer?: IViewer
  hasViewer: boolean
}

interface IViewerProviderProps {
  expectViewer: boolean
  children: React.ReactNode
}

let _viewer: IViewer | null = null

export function ViewerProvider({
  expectViewer,
  children
}: IViewerProviderProps) {
  if (typeof window !== 'undefined') _viewer = window.__VIEWER__

  const [viewer, setViewer] = useState(_viewer)
  const hasViewer = !!viewer
  const [refetched, setRefetched] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setLoading] = useState(!!_viewer)

  useEffect(() => {
    loadViewer()
  }, [1])

  async function loadViewer(): Promise<void> {
    const session = await Database.getSessionDetails()
    if (!session) return (location.href = '/login')
    const { userId, user } = session

    if (user) {
      setViewer(user)
      setLoading(false)
    }

    if (process.browser && !refetched) {
      const { response, error }: IApiResponse<IViewer> = await get(
        `${API}/api/user/${userId}`
      )

      if (!error && response && response.status) {
        Database.setSessionDetails({
          ...session,
          user: response.data
        })
        setViewer(response.data)
        window.__VIEWER__ = response.data
        setRefetched(true)
        setLoading(false)
      } else {
        // location.href = '/login'
      }
    } else {
      setViewer(window.__VIEWER__)
    }
  }

  // if (expectViewer && !hasViewer && !isLoading) return <LoginRequired />

  function onModalCancel() {
    setModalVisible(false)
  }

  function showModal(message: string) {
    setMessage(message)
    setModalVisible(true)
  }

  return (
    <ViewerContext.Provider value={{ expectViewer, viewer, showModal }}>
      <>
        {hasViewer ? children : <Loading />}
        <Modal
          centered
          footer={null}
          width={550}
          visible={modalVisible}
          onCancel={onModalCancel}
          destroyOnClose
        >
          <AuthModal message={message} />
        </Modal>
      </>
    </ViewerContext.Provider>
  )
}

export function provideViewer(
  Component,
  { requiresViewer = false, required = false } = {}
) {
  return props => (
    <ViewerProvider expectViewer={requiresViewer || required}>
      <Component {...props} />
    </ViewerProvider>
  )
}

export function useViewer(): IViewerProps {
  const { viewer, refetch, showModal } = useContext(ViewerContext)
  const hasViewer = !!viewer

  function requireViewer(message = 'Login') {
    if (hasViewer) return true
    showModal(message)
    return false
  }

  return {
    viewer,
    refetchViewer: refetch,
    hasViewer: hasViewer,
    requireViewer: requireViewer
  }
}
