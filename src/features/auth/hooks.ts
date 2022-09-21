import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

const selector = ({ firebase }: any) => ({
  auth: firebase.auth,
  profile: firebase.profile,
})

export function useAuth() {
  const { auth, profile } = useSelector(selector)

  return useMemo(
    () => ({
      ...auth,
      profile,
      loaded: isLoaded(auth),
    }),
    [auth, profile]
  )
}
