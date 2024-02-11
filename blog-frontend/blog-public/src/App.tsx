
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useMutation, useQuery } from 'react-query'
import { homeService } from './services/resources/home-service'
import { useEffect } from 'react'
import { authService } from './services/resources/auth-service'
import useUserStore from './store/user-store'

let ditInit = false

function App() {

  const updateUser = useUserStore(state => state.updateUser)

  const { mutate: updateVisitCount } = useMutation('updateVisitCount', homeService.updateSiteVisitCount)

  const { refetch: verifyToken } = useQuery('verifyToken', authService.verifyToken, {
    onSuccess: (data) => {
      updateUser(data)
    },
    enabled: false
  })

  useEffect(() => {
    if (!ditInit) {
      ditInit = true
      updateVisitCount()
      verifyToken()
    }
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
